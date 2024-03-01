import * as d3 from 'd3';

interface IDataPoint {
  timestamp: string;
  usage: number;
}

class MonitoringGraph {
  private data: IDataPoint[] = [];
  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  private margin = { top: 40, right: 30, bottom: 30, left: 40 };
  private width: number;
  private height: number;
  private xScale: d3.ScalePoint<string>;
  private yScale: d3.ScaleLinear<number, number, never>;
  private line: d3.Line<IDataPoint>;
  private title: string = '';

  constructor(type: string) {
    const svgWidth = 960;
    const svgHeight = 500;
    this.width = svgWidth - this.margin.left - this.margin.right;
    this.height = svgHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(`#${type}-chart`).append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`) as any;

    this.xScale = d3.scalePoint()
      .range([0, this.width])
      .domain(this.data.map(d => d.timestamp));
    this.yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    if (type === 'cpu') {
      this.title = 'CPU Usage (%)'
    } else if (type === 'memory') {
      this.title = 'RAM Usage (%)'
    } else if (type === 'disk') {
      this.title = 'Disk Usage (%)'
    }

    this.svg.append('text')
      .attr('x', this.width / 2)
      .attr('y', 0 - (this.margin.top / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#d3d5dd')
      .text(this.title);

    this.svg.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.svg.append('g')
      .call(d3.axisLeft(this.yScale));

    this.line = d3.line<IDataPoint>()
    .x(d => this.xScale(d.timestamp) || 0)
    .y(d => this.yScale(d.usage));


    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5);
  }

  public updateGraph(newData: IDataPoint): void {
    this.data.push(newData);

    this.xScale.domain(this.data.map(d => d.timestamp));

    this.svg.select('.line')
      .datum(this.data)
      .attr('d', this.line);

    this.svg.select('.x-axis')
      .call(d3.axisBottom(this.xScale) as any);
  }

}

const monitoringCpuGraph = new MonitoringGraph('cpu');
const monitoringMemoryGraph = new MonitoringGraph('memory');
const monitoringDiskGraph = new MonitoringGraph('disk')

export function updateGraphData(newData: IDataPoint, type: string) {
  if (type === 'cpu') {
    monitoringCpuGraph.updateGraph(newData)
  } else if (type === 'memory') {
    monitoringMemoryGraph.updateGraph(newData)
  } else if (type === 'disk') {
    monitoringDiskGraph.updateGraph(newData)
  }
}
