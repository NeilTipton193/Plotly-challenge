


//function that populates metadata
function demographicInfo(sample)
{
    console.log(sample);
    
    // load data from samples.json
    d3.json("samples.json").then((data) => {
        // retrieve metedata
        let metaData = data.metadata;
        //console.log(metaData);

        //filter based on value of sample
        let result = metaData.filter(sampleResult >= sampleResult.id == sample);

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
            d3.select("#sample-metadata").append("<h5>").text(`${key}: ${value}`);
        })
    });
}

//function that builds graphs
function buildBarChart(sample){
    console.log(sample);
    let data = d3.json("samples.json");
    console.log(data);
}

// function to initialize dashboard
function initialize()
{
    //let data = d3.json("samples.json");
    //console.log(data);
    // access dropdown selector from index.html
    var select = d3.select("selDataset");

    // load data from samples.json
    d3.json("samples.json").then((data) => {
        //use d3.json to get the data
        let sampleNames = data.names;
        //console.log(sampleNames);

        // use for each to create options
        // for selector
        sampleNames.forEach((sample) => {
            select.append("option").text(sample).property("value", sample);
        });
        
        let sample1 = sampleNames[0];

        //call the function to build the metadata
        demographicInfo(sample1);
        //build bar chart
        buildBarChart(sample1);
    });
     
    // pass in the info for the first sample when initialized

}

//function that updates dashboard
function optionChanged(item)
{
    // call update to metadata
    demographicInfo(item);
    // build bar chart
    buildBarChart(item);
}

// call function
initialize();