
const BaseURL = "https://raw.githubusercontent.com/Pikselas/jellymilk/master";
const ISMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('Mobile') !== -1);

var containerPos = 100;

function ToggleContainer()
{
    document.getElementById("ModelsContainer").style.top = `calc(${containerPos ^= 100}% + 30px)`;
}

async function GetModels(modelType)
{
    let res = await fetch(`${BaseURL}/data/categories/${modelType}.json`);
    if(res.ok)
    {
        return await res.json();
    }
}

function CreateDetailsPanel(desc , links)
{
   let panel = document.createElement("div");
   panel.className = "modelDetails";  
   
   let panelCloseArea = document.createElement("div");
   let panelCloseButton = document.createElement("button");
   panelCloseButton.innerHTML = "X";
   panelCloseArea.className = "CloseButtonContainer";
   panelCloseArea.appendChild(panelCloseButton);

   panelCloseButton.onclick = () => {panel.parentElement.removeChild(panel)};

   panel.appendChild(panelCloseArea);

   let container = document.createElement("div");
   container.className = "Container";

   container.innerHTML += desc + "<br/><br/><br/>";

   links.forEach((link)=>{

    let lnk = document.createElement("a");
    lnk.href = link;
    lnk.target = "_blank";
    //get the base url of link
    let baseurl = link.split("/")[2];
    lnk.innerHTML = baseurl;
    container.appendChild(lnk);
    container.innerHTML += "<br/>";

   });

   panel.appendChild(container);
   return panel;
}

function CreateModelPanel(name)
{
    let panel = document.createElement("div");
    let circle1 = document.createElement("div");
    let circle2 = document.createElement("div");
    let imgcontainer = document.createElement("div");
    let img = document.createElement("img");
    let titlecontainer = document.createElement("div");
    let title = document.createElement("h1");
    img.src = "./loadimg.gif";

    let ProfileImg = new Image();
    ProfileImg.src = `${BaseURL}/profile_pics/${name}.png`;
    ProfileImg.onload = ()=>{
        imgcontainer.removeChild(img);
        imgcontainer.appendChild(ProfileImg);
    }

    panel.className = ISMobile? "Card Mobile" : "Card";
    circle1.className = "Circle";
    circle2.className = "Circle";
    imgcontainer.className = "ImgCont";
    titlecontainer.className = "Title";
    title.innerHTML = name;
    
    imgcontainer.appendChild(img);
    titlecontainer.appendChild(title);
    panel.appendChild(circle1);
    panel.appendChild(circle2);
    panel.appendChild(imgcontainer);
    panel.appendChild(titlecontainer);
    return panel;
}

function ShowModels(modelType)
{
    let Modcon = document.getElementById("ModelsContainer").children[1];
    Modcon.innerHTML = "";
    GetModels(modelType).then((modelsJson)=>{
        modelsJson["models"].forEach(model => {
            let modelPanel = CreateModelPanel(model);
            modelPanel.onclick = ()=>{

                fetch(`${BaseURL}/data/models/${model}.json`).then((res)=>{
                    res.json().then((details)=>{
                        let panel = CreateDetailsPanel(details["description"] , details["links"]);
                        document.body.appendChild(panel);
                        // panel.style.left = (document.body.offsetWidth / 2) - (panel.offsetWidth / 2) + "px";
                    })
                });

            };
            Modcon.appendChild(modelPanel);            
        });
    });
}

document.body.onload = ()=>{

    fetch(BaseURL + "/data/categories.json").then((res)=>{
        res.json().then((data)=>{
            data["categories"].forEach((category)=>{
                let button = document.createElement("button");
                button.innerHTML = category;
                button.onclick = ()=>{
                    ToggleContainer();
                    ShowModels(category);
                }
                document.getElementById("TypesContainer").appendChild(button);
            })
        });
    });
}