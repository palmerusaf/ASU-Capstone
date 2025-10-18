import Plot from 'react-plotly.js';
export function TotalJobs() {
  // TODO: fix styling for dark/light mode
  return <Plot data={[{ type: 'sankey' }]} layout={{}} />;
}

function getSanKeyJobData() {
  // get total jobs
  // get total applied jobs
  // break applied jobs down by last status
  // get total unapplied jobs
  // break unapplied jobs down by last status
}
