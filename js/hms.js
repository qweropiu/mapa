function hms(s) {
  var h = s / 3600 | 0;
  var m = (s / 60 | 0) % 60;
  var r = [];
  if (h > 0) r.push.apply(r, [h, "h"]);
  if (m > 0) r.push.apply(r, [m, "m"]);
  if (!r.length) return s + " s";
  return r.join(" ");
}
