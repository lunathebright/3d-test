import React, { useEffect } from 'react';

export default function D3() {
  useEffect(() => {
    d3.selectAll('p').style('color', function () {
      return 'hsl(' + Math.random() * 360 + ',100%,50%)';
    });
    d3.selectAll('p')
      .data([4, 8, 15, 16, 23, 42])
      .style('font-size', function (d) {
        return d + 'px';
      });
    var p = d3
      .select('body')
      .selectAll('p')
      .data([4, 8, 15, 16, 23, 42])
      .text(function (d) {
        return d;
      });

    // Enter…
    p.enter()
      .append('p')
      .text(function (d) {
        return d;
      });

    // Exit…
    p.exit().remove();
    d3.select('body').transition().style('background-color', 'black');
  }, []);

  return (
    <div>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
}
