


//function that populates metadata
function demographicInfo(sample)
{
    //console.log(sample);
    
    // load data from samples.json
    d3.json("samples.json").then((data) => {
        // retrieve metedata
        let metaData = data.metadata;
        //console.log(metaData);

        //filter based on value of sample
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        //console.log(result);

        //access index 0 from array
        let resultData = result[0];
        console.log(resultData);

        //clear metadata
        d3.select("#sample-metadata").html(""); //clears html out
        //use Object.entries to get key-value pairs
        Object.entries(resultData).forEach(([key, value]) =>
        {
            // add to select panel 
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        })
    });
}

//function that builds graphs
function buildBarChart(sample){
    // console.log(sample);
    // let data = d3.json("samples.json");
    // console.log(data);

    // load data from samples.json
    d3.json("samples.json").then((data) => {
        // retrieve sample data
        let sampleData = data.samples;
        //console.log(sampleData);

        //filter based on value of sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from array
        let resultData = result[0];
        //console.log(resultData);

        // get otu_ids, labels and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sampleValues = resultData.sample_values;


        // build the bar chart
        //get the yticks
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xticks = sampleValues.slice(0,10);
        let textLabels = otu_labels.slice(0,10);

        let barChart = {
            y: yticks.reverse(),
            x: xticks.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }
        let layout = {
            title: "The Top 10 Belly Button Bacteria"
        }

        Plotly.newPlot("bar",[barChart],layout)
    });
}

// function to build the bubble chart
function buildBubbleChart(sample)
{
 // console.log(sample);
    // let data = d3.json("samples.json");
    // console.log(data);

    // load data from samples.json
    d3.json("samples.json").then((data) => {
        // retrieve sample data
        let sampleData = data.samples;
        //console.log(sampleData);

        //filter based on value of sample
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        //access index 0 from array
        let resultData = result[0];
        //console.log(resultData);

        // get otu_ids, labels and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sampleValues = resultData.sample_values;


        // build the bubble chart

        let bubbleChart = {
            y: sampleValues,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otu_ids,
                colorscale: "Earth"
            }
        }
        let layout = {
            title: "Bacteria Cultures/Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot("bubble",[bubbleChart],layout)
    });
}
// function to initialize dashboard
function initialize()
{
    //let data = d3.json("samples.json");
    //console.log(data);
    // access dropdown selector from index.html
    var select = d3.select("#selDataset");

    // load data from samples.json
    d3.json("samples.json").then((data) => {
        //use d3.json to get the data
        let sampleNames = data.names;
        //console.log(sampleNames);

        // use for each to create options
        // for selector
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
        
        let sample1 = sampleNames[0];

        //call the function to build the metadata
        demographicInfo(sample1);
        //build bar chart
        buildBarChart(sample1);
        //build bubble chart
        buildBubbleChart(sample1);
    });
     
    

}

//function that updates dashboard
function optionChanged(item)
{
    // call update to metadata
    demographicInfo(item);
    // build bar chart
    buildBarChart(item);
    //build bubble chart
    buildBubbleChart(item);
}

// call function
initialize();