import { Streamlit, RenderData } from "streamlit-component-lib"
import 'datatables.net'
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
var $       = require( 'jquery' );
//var dt      = require( 'datatables.net' )();
//var buttons = require( 'datatables.net-buttons' )();

const span = document.createElement("span")
span.setAttribute("class", "streamlit-base")
const spanNode = document.body.appendChild(span)
const table = document.createElement("table")

function makeid(length: number): string {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `datatable-${result}`;
}

type StreamlitTheme = {
  primaryColor: string;
  backgroundColor: string;
  secondaryBackgroundColor: string;
  textColor: string;
  font: string 
};

type Column = {
  data: string
}

function addStyle(theme: StreamlitTheme): void {
    const fontFamily = theme["font"]
    const primaryColor = theme["primaryColor"]
    var styles = `
      .streamlit-base {
        font-family: ${fontFamily}
      }
      .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
        color: white !important;
        border: 1px solid ${primaryColor};
        background-color: ${primaryColor};
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #fcbccd), color-stop(100%, ${primaryColor}));
        /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(top, #fcbccd 0%, ${primaryColor} 100%);
        /* Chrome10+,Safari5.1+ */
        background: -moz-linear-gradient(top, #fcbccd 0%, ${primaryColor} 100%);
        /* FF3.6+ */
        background: -ms-linear-gradient(top, #fcbccd 0%, ${primaryColor} 100%);
        /* IE10+ */
        background: -o-linear-gradient(top, #fcbccd 0%, ${primaryColor} 100%);
        /* Opera 11.10+ */
        background: linear-gradient(to bottom, #fcbccd 0%, ${primaryColor} 100%);
        /* W3C */
      }
    `
    var styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
}

function makeTable(table_id: string, columns: Column[]): void {
  table.setAttribute("id", table_id)
  table.setAttribute("class", "display streamlit-datatable")

  const thead = table.appendChild(document.createElement("thead"))
  const trow = thead.appendChild(document.createElement("tr"))
  for (let col of columns) {
    const th = trow.appendChild(document.createElement("th"))
    th.textContent = col["data"]
  }
  spanNode.appendChild(table)
  spanNode.appendChild(document.createElement("br"))
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event: Event): void {
  // Get the RenderData from the event
  const data = (event as CustomEvent<RenderData>).detail

  if (data.theme) {
    addStyle(data.theme)
  }

  // RenderData.args is the JSON dictionary of arguments sent from the
  // Python script.
  let tabledata = data.args["tabledata"]
  let columns = data.args["columns"]

  const table_id = makeid(10)
  makeTable(table_id, columns)

  $(`#${table_id}`).DataTable({
    data: tabledata,
    columns: columns,
    scrollX: true
  });

  // We tell Streamlit to update our frameHeight after each render event, in
  // case it has changed. (This isn't strictly necessary for the example
  // because our height stays fixed, but this is a low-cost function, so
  // there's no harm in doing it redundantly.)
  Streamlit.setFrameHeight()
}

// Attach our `onRender` handler to Streamlit's render event.
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

// Tell Streamlit we're ready to start receiving data. We won't get our
// first RENDER_EVENT until we call this function.
Streamlit.setComponentReady()

// Finally, tell Streamlit to update our initial height. We omit the
// `height` parameter here to have it default to our scrollHeight.
Streamlit.setFrameHeight()
