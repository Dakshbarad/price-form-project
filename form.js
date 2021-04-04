// Form Data
const Items = ["tissue", "sticker", "mailer"];
const ItemComponents = {
  tissue: [
    {
      id: 1,
      defaultprice: 1,
      type: "toggleswitch",
      heading: "How many colours?",
      value1: {
        text: "Single colour",
        price: 1,
      },
      value2: {
        text: "Two colours",
        price: 2,
      },
    },
    {
      id: 2,
      defaultprice: 2,
      type: "toggleswitch",
      heading: "What size?",
      value1: {
        text: "Small(38x50cm)",
        price: 2,
      },
      value2: {
        text: "Standard(50x75cm)",
        price: 4,
      },
    },
    {
      id: 3,
      type: "slider",
      defaultprice: 1000,
      heading: "How many sheets?",
      count: 5,
      breakpoints: [
        {
          text: "250",
          value: 250,
        },
        {
          text: "500",
          value: 500,
        },
        {
          text: "1,000",
          value: 1000,
        },
        {
          text: "2,000",
          value: 2000,
        },
        {
          text: "5,000",
          value: 5000,
        },
      ],
    },
  ],
  sticker: [
    {
      id: 1,
      defaultprice: 2,
      type: "slider",
      heading: "What shape?",
      count: 3,
      breakpoints: [
        {
          text: "Circle",
          value: 1,
        },
        {
          text: "Square",
          value: 2,
        },
        {
          text: "Rectangle",
          value: 1,
        },
      ],
    },
    {
      id: 2,
      type: "slider",
      defaultprice: 3,
      heading: "What size?",
      count: 5,
      breakpoints: [
        {
          text: "25 x 25mm",
          value: 1,
        },
        {
          text: "40 x 40mm",
          value: 2,
        },
        {
          text: "50 x 50mm",
          value: 3,
        },
        {
          text: "75 x 75mm",
          value: 4,
        },
        {
          text: "100 x 100mm",
          value: 5,
        },
      ],
    },
    {
      id: 3,
      type: "slider",
      defaultprice: 2000,
      heading: "How many stickers?",
      count: 6,
      breakpoints: [
        {
          text: "250",
          value: 250,
        },
        {
          text: "500",
          value: 500,
        },
        {
          text: "1,000",
          value: 1000,
        },
        {
          text: "2,000",
          value: 2000,
        },
        {
          text: "5,000",
          value: 5000,
        },
        {
          text: "10,000",
          value: 10000,
        },
      ],
    },
  ],
  mailer: [
    {
      id: 1,
      type: "radiobuttons",
      defaultprice: 1,
      heading: "What size?",
      count: 4,
      choices: [
        {
          text: {
            name: "Extra Small",
            inch: `6.5" x 9"`,
            mm: "165mm , 230mm",
          },
          value: 1,
        },
        {
          text: {
            name: "Small",
            inch: `10.2" x 15"`,
            mm: "260mm , 385mm",
          },
          value: 2,
        },
        {
          text: {
            name: "Standard",
            inch: `11.8" x 16.5"`,
            mm: "300mm , 420mm",
          },
          value: 3,
        },
        {
          text: {
            name: "Large",
            inch: `14.5" x 18.8"`,
            mm: "370mm , 480mm",
          },
          value: 4,
        },
      ],
    },
    {
      id: 2,
      type: "slider",
      defaultprice: 1000,
      heading: "How many mailers?",
      count: 4,
      breakpoints: [
        {
          text: "250",
          value: 250,
        },
        {
          text: "500",
          value: 500,
        },
        {
          text: "1,000",
          value: 1000,
        },
        {
          text: "2,000",
          value: 2000,
        },
      ],
    }
  ],
};

let current = "tissue";

let currentPrice = {
  price1: 0,
  price2: 0,
  price3: 1,
};

// Form functionality
document.addEventListener("DOMContentLoaded", () => {
  setSelectedItem();
});

const setSelectedItem = () => {
  setComponents("tissue");
  setListeners();
  //   setDefaultPrice();
  calculateCost();

  var CurrentItem = document.querySelector("#item");
  CurrentItem.addEventListener("change", (item) => {
    currentPrice = {
      price1: 0,
      price2: 0,
      price3: 1,
    };
    setComponents(item.target.value);
    current = item.target.value;
    console.log(current);
    setListeners();
    // setDefaultPrice();
    calculateCost();
  });
};

const setComponents = (item) => {
  var components = document.querySelector(".components");
  const componentList = ItemComponents[item];
  console.log(componentList);
  components.innerHTML = "";
  componentList.forEach((component, index) => {
    switch (component.type) {
      case "toggleswitch":
        var tempComponent = createToggleSwitch(component);
        components.append(tempComponent);
        break;

      case "slider":
        var tempComponent = createSlider(component);
        components.append(tempComponent);
        break;

      case "radiobuttons":
        var tempComponent = createRadioButtons(component);
        components.append(tempComponent);
        var firstRadioBtn = document.querySelector("#radio-btn-1");
        console.log("here",firstRadioBtn);
        firstRadioBtn.setAttribute("checked",true);
        break;
    }
  });
};

const createToggleSwitch = (data) => {
  const { id, defaultprice, heading, value1, value2 } = data;
  var div = document.createElement("div");
  div.setAttribute("class", "component");
  //   div.setAttribute("id", `component-${id}`);
  div.innerHTML = `
        <h4 class="switch-heading">${heading}</h4>
        <div class="switch-container">
            <p>${value1.text}</p>
            <label class="switch">
                <input type="checkbox" id="component-${id}">
                <span class="slider round"></span>
            </label>
            <p>${value2.text}</p>
        </div>
    `;
  console.log(div);
  currentPrice[`price${id}`] = defaultprice;
  return div;
};

const createSlider = (data) => {
  const { id, defaultprice, heading, count, breakpoints } = data;
  var div = document.createElement("div");
  div.setAttribute("class", "component range-slider");
  //   div.setAttribute("id", `component-${id}`);
  var code = `
    <h4 class="component-heading">${heading}</h4>
    <input type="range" id="component-${id}" list="breakpoints-${id}" min="0" max="${
    count - 1
  }" step="1" />
    <datalist id="breakpoints-${id}" >
    `;
  breakpoints.forEach((item, index) => {
    code += `<option value="${index}" label="${item.text}"></option>`;
  });
  code += `</datalist>`;
  div.innerHTML += code;
  currentPrice[`price${id}`] = defaultprice;
  console.log(div);
  return div;
};

const createRadioButtons = (data) => {
  const { id, heading, defaultprice, choices } = data;
  var div = document.createElement("div");
  div.setAttribute("class", "component");
  var code = `
        <h4 class="component-heading">${heading}</h4>
        <section class="button-list" id="component-${id}">
        
    `;
  choices.forEach((item, index) => {
    code += `
        <div class="radio-btn">
            <label for="radio-btn-${index + 1}">
                <p>${item.text.name}</p>
                <p>${item.text.inch}</p>
                <p>${item.text.mm}</p>
            </label>
            <input type="radio" id="radio-btn-${
              index + 1
            }" name="radio-${id}" value="${item.value}" />
        </div>
        `;
  });
  code += `
    </section>
    `;
  div.innerHTML = code;
  currentPrice[`price${id}`] = defaultprice;
  console.log(div);
  return div;
};

// Setting listeners
const setListeners = () => {
  switch (current) {
    case "tissue":
      var component1 = document.querySelector("#component-1");
      var component2 = document.querySelector("#component-2");
      var component3 = document.querySelector("#component-3");
      console.log(component1.checked);

      component1.addEventListener("change", () => {
        const { value1, value2 } = ItemComponents[current][0];
        if (component1.checked) {
          currentPrice.price1 = value2.price;
        } else {
          currentPrice.price1 = value1.price;
        }
        calculateCost();
      });
      component2.addEventListener("change", () => {
        const { value1, value2 } = ItemComponents[current][1];
        if (component2.checked) {
          currentPrice.price2 = value2.price;
        } else {
          currentPrice.price2 = value1.price;
        }
        calculateCost();
      });
      component3.addEventListener("change", () => {
        const { breakpoints } = ItemComponents[current][2];
        currentPrice.price3 = breakpoints[component3.value].value;
        calculateCost();
      });
      break;

    case "sticker":
      var component1 = document.querySelector("#component-1");
      var component2 = document.querySelector("#component-2");
      var component3 = document.querySelector("#component-3");
      console.log(component1.checked);

      component1.addEventListener("change", () => {
        const { breakpoints } = ItemComponents[current][0];
        currentPrice.price1 = breakpoints[component1.value].value;
        calculateCost();
      });

      component2.addEventListener("change", () => {
        const { breakpoints } = ItemComponents[current][1];
        currentPrice.price2 = breakpoints[component2.value].value;
        calculateCost();
      });

      component3.addEventListener("change", () => {
        const { breakpoints } = ItemComponents[current][2];
        currentPrice.price3 = breakpoints[component3.value].value;
        calculateCost();
      });
      break;

    case "mailer":
      var btn1 = document.querySelector("#radio-btn-1");
      var btn2 = document.querySelector("#radio-btn-2");
      var btn3 = document.querySelector("#radio-btn-3");
      var btn4 = document.querySelector("#radio-btn-4");
      var component1 = document.querySelector("#component-1");
      var component2 = document.querySelector("#component-2");

      console.log("this",component1)

      component1.addEventListener("click", () => {
        const { choices } = ItemComponents[current][0];
        if (btn1.checked) {
          currentPrice.price1 = choices[0].value;
        } else if (btn2.checked) {
          currentPrice.price1 = choices[1].value;
        } else if (btn3.checked) {
          currentPrice.price1 = choices[2].value;
        } else if (btn4.checked) {
          currentPrice.price1 = choices[3].value;
        }
        calculateCost();
      });

      component2.addEventListener("change", () => {
        const { breakpoints } = ItemComponents[current][1];
        currentPrice.price2 = breakpoints[component2.value].value;
        calculateCost();
      });
      break;
  }
};

// Cost calculator
const calculateCost = () => {
  var cost = document.querySelector("#cost");
  var { price1, price2, price3 } = currentPrice;
  console.log(currentPrice);
  if(current!=="mailer"){
      var result = (price1 + price2) * price3;
  }else{
      var result = price1 * price2;
  }
  cost.innerHTML = `$${result}`;
};
