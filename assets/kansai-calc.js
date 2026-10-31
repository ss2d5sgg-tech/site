/* FareWise Japan — Kansai pass calculator engine (pure functions, no DOM).
   Works in the browser (window.KansaiCalc) and in Node (module.exports) for tests. */
(function (root) {
  var ACTIVITIES = {
    osaka: {
      rest:        { label: "No train travel / walking only", rides: [], city: null },
      osaka_city:  { label: "Sightseeing in Osaka city", rides: [], city: "osaka" },
      kyoto_trip:  { label: "Day trip to Kyoto (plus city buses there)", rides: [["osaka_kyoto_jr", "umeda_kawaramachi_hk"], ["osaka_kyoto_jr", "umeda_kawaramachi_hk"]], city: "kyoto" },
      nara_trip:   { label: "Day trip to Nara", rides: [["osaka_nara_jr", "namba_nara_kt"], ["osaka_nara_jr", "namba_nara_kt"]], city: null },
      kobe_trip:   { label: "Day trip to Kobe", rides: [["osaka_kobe_jr", "umeda_kobe_hk"], ["osaka_kobe_jr", "umeda_kobe_hk"]], city: null },
      himeji_trip: { label: "Day trip to Himeji Castle", rides: [["osaka_himeji_jr"], ["osaka_himeji_jr"]], city: null }
    },
    kyoto: {
      rest:         { label: "No train travel / walking only", rides: [], city: null },
      kyoto_city:   { label: "Sightseeing in Kyoto city (buses)", rides: [], city: "kyoto" },
      inari_arashi: { label: "Fushimi Inari and Arashiyama by JR", rides: [["kyoto_inari_jr"], ["kyoto_inari_jr"], ["kyoto_arashi_jr"], ["kyoto_arashi_jr"]], city: null },
      osaka_trip:   { label: "Day trip to Osaka (plus Metro there)", rides: [["osaka_kyoto_jr", "umeda_kawaramachi_hk"], ["osaka_kyoto_jr", "umeda_kawaramachi_hk"]], city: "osaka" },
      nara_trip:    { label: "Day trip to Nara", rides: [["kyoto_nara_jr", "kyoto_nara_kt"], ["kyoto_nara_jr", "kyoto_nara_kt"]], city: null }
    }
  };
  var ARRIVE = { osaka: ["kix_osaka_jr", "kix_namba_nk"], kyoto: ["kix_kyoto_honeway", "kix_kyoto_haruka", "kix_kyoto_rapid"] };
  var DEPART = { osaka: ["kix_osaka_jr", "kix_namba_nk"], kyoto: ["kyoto_kix_haruka", "kyoto_kix_rapid"] };

  /* trip = { base, visitor, days:[{activity, weekend}], arrive, depart, rides:{osaka:n, kyoto:n}, rideYen:{osaka:y} } */
  function dayRides(trip, i) {
    var D = trip.days[i], act = ACTIVITIES[trip.base][D.activity] || ACTIVITIES[trip.base].rest, out = [];
    if (i === 0 && trip.arrive) out.push(ARRIVE[trip.base]);
    act.rides.forEach(function (r) { out.push(r); });
    if (i === trip.days.length - 1 && trip.depart) out.push(DEPART[trip.base]);
    return { rides: out, city: act.city };
  }

  function candidatePlans(trip, data) {
    var n = trip.days.length, jr = [{ id: null }], kt = [{ id: null }];
    var ok = function (pid) { return trip.visitor || !data.passes[pid].visitorOnly; };
    for (var s = 0; s < n; s++) {
      if (ok("kansai_area")) for (var L = 1; L <= 4 && s + L <= n; L++) jr.push({ id: "kansai_area", start: s, len: L, price: data.passes.kansai_area.prices[L] });
      if (ok("jr_2day") && s + 2 <= n) jr.push({ id: "jr_2day", start: s, len: 2, price: data.passes.jr_2day.prices[2] });
      if (ok("kintetsu_1")) kt.push({ id: "kintetsu_1", start: s, len: 1, price: data.passes.kintetsu_1.prices[1] });
      if (ok("kintetsu_2") && s + 2 <= n) kt.push({ id: "kintetsu_2", start: s, len: 2, price: data.passes.kintetsu_2.prices[2] });
    }
    var plans = [];
    jr.forEach(function (a) { kt.forEach(function (b) { plans.push([a, b].filter(function (p) { return p.id; })); }); });
    return plans;
  }

  function activeOn(plan, i) { return plan.filter(function (p) { return i >= p.start && i < p.start + p.len; }).map(function (p) { return p.id; }); }

  function costPlan(trip, data, plan) {
    var total = plan.reduce(function (s, p) { return s + p.price; }, 0), days = [];
    for (var i = 0; i < trip.days.length; i++) {
      var act = activeOn(plan, i), dr = dayRides(trip, i), items = [], dayCost = 0;
      dr.rides.forEach(function (opts) {
        var best = null;
        opts.forEach(function (k) {
          var f = data.fares[k]; if (!f) return;
          if (f.visitorOnly && !trip.visitor) return;
          if (trip.fastAirport && (k === "kix_kyoto_rapid" || k === "kyoto_kix_rapid")) return;
          var cov = f.passes.filter(function (p) { return act.indexOf(p) >= 0; })[0];
          var c = cov ? 0 : f.yen;
          if (!best || c < best.cost || (c === best.cost && cov && !best.coveredBy)) best = { key: k, label: f.label, cost: c, coveredBy: cov || null, fare: f.yen };
        });
        if (best) { items.push(best); dayCost += best.cost; }
      });
      if (dr.city) {
        var cr = data.cityRide[dr.city], nRides = trip.rides[dr.city], yen = (trip.rideYen && trip.rideYen[dr.city]) || cr.yen;
        var single = nRides * yen, passPrice, passName;
        if (dr.city === "osaka") { passPrice = trip.days[i].weekend ? data.passes.osaka_eco.prices.weekend : data.passes.osaka_eco.prices.weekday; passName = data.passes.osaka_eco.name; }
        else { passPrice = data.passes.kyoto_1day.prices[1]; passName = data.passes.kyoto_1day.name; }
        if (nRides > 0) {
          if (passPrice < single) items.push({ key: "citypass_" + dr.city, label: passName + " (instead of " + nRides + " single rides at ¥" + yen + ")", cost: passPrice, citypass: true });
          else items.push({ key: "city_" + dr.city, label: nRides + " × " + cr.label + " at ¥" + yen, cost: single });
          dayCost += Math.min(passPrice, single);
        }
      }
      total += dayCost; days.push({ items: items, cost: dayCost, active: act });
    }
    return { plan: plan, total: total, days: days };
  }

  function solve(trip, data) {
    var all = candidatePlans(trip, data).map(function (p) { return costPlan(trip, data, p); });
    all.sort(function (a, b) { return a.total - b.total || a.plan.length - b.plan.length; });
    function bestWhere(fn) { return all.filter(fn)[0] || null; }
    var fam = {
      none: bestWhere(function (r) { return r.plan.length === 0; }),
      kansai_area: bestWhere(function (r) { return r.plan.some(function (p) { return p.id === "kansai_area"; }); }),
      jr_2day: bestWhere(function (r) { return r.plan.some(function (p) { return p.id === "jr_2day"; }); }),
      kintetsu: bestWhere(function (r) { return r.plan.some(function (p) { return p.id.indexOf("kintetsu") === 0; }); })
    };
    return { best: all[0], families: fam, count: all.length };
  }

  var api = { ACTIVITIES: ACTIVITIES, solve: solve, costPlan: costPlan };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.KansaiCalc = api;
})(this);
