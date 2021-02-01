function init() 
  // Grab a reference to the dropdown select element
d3.json('/samples').then(data =>{

  // Use the list of sample names to populate the select options
var selector = d3.selector = d3.select('#selDataset');
  var sampleNames = data['names'];
    sampleNames.forEach(sample => {
      selector
      .append('option')
      .text(sample)
      .property('value',sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];

    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  
// BuildCharts

function buildCharts(sample) {
  d3.json('/samples').then(data => {
    var samples = data['samples'];
    var resultArray = samples['filter'](sampleObj => sampleObj['id']== sample);
    var result = resultArray[0];

    var otu_ids = result['otu_ids'];
    var otu_labesl = result['otu_labels'];
    var sample_values = result['sample_values'];

    //console.log(otu_ids);
    //console.log(sample_values);

    //Build Bubble Chart
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID'}

    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_lables,
        mode: 'markers',
        marker: {
          size : sample_values,
          color: otu_ids,
          colorscale: 'Earth'
        }
      }  
    ];
    Plotly.newPlot('bubble', bubbleData,bubbleLayout);

    var yticks = otu_ids.slice(0,10).map(otuID => 'OTU ${otuID}').reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0,10).reverse(),
        text : otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h',
      }
    ];
    
    var barlayout = {
      title: 'Top 10 Bacteria Cultures Found',
      margin : { t: 30,1: 150}
    };

    Plotly.newPlot('bar',barData, barLayout);
  });
}  


    //Build Metadata
function buildMetadata(sample) {
  d3.json('/samples').then((data) => {
    var metadata = data['metadata'];

    var resultArray = metadata.filter(sampleObj => sampleObj['id'] == sample);
    var result = resultArray[0];

  //Use d3 to select the panel with id of '#sample-metada
    var PANEL = d3.select('#sample-metadat');

  //Use '.html('') to clear any existing metadata
    PANEL.html('');

  //Use 'Object.entries' to add each key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append('h6').text('${key.toUpperCase()}: ${value}');
    });  
  });
}
  // Build the Gauge Chart
  wash_frequency = result.wfreq;
  buildGauge(wash_frequency);
  
  function buildGauge(wash_frequency){
    var data = [
      {
        type: "indicator",
        mode: "gauge + number",
        value: wash_frequency,
        title: {text: "Wash Frequency", font: {size: 18}},

        gauge: {
          axis: { range: [null,10], tickwidth: 1, tickcolor: "darkblue"},
          bar: { color: "darkblue"},
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            {range: [0,10],color:"lavender"},
          ],
        }
      }
    ]
  };
    var layout ={
    width: 300,
    height: 250,
    margin: {t:25,r:25,l:25, b:25},
    font: { size: 12}
  };

   var GAUGE = d3.select('#gauge').node();
   Plotly.newPlot(GAUGE, data, layout);

/*
   Hints: Create additional functions to build the charts,
          build the gauge chart, set up the metadata,
          and handle the event listeners

   Recommended function names:
    optionChanged() 
    buildChart()
    buildGauge()
    buildMetadata()
*/

// Initialize the dashboard
init();