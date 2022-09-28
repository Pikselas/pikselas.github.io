function ToggleContainer()
{
    document.getElementById("ModelsContainer").hidden ^= 1;
}

async function GetModels(modelType)
{
    let res = await fetch(`data/catagories/${modelType}.json`);
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
    lnk.innerHTML = link;
    container.appendChild(lnk);
    container.innerHTML += "<br/>";

   });

   panel.appendChild(container);
   return panel;
}

//generates random color between blue and green
function randomColorBG() 
{
    let r = 0, g = Math.random() * 255, b = Math.random() * 255;
    return "rgb(" + r + "," + g + "," + b + ")";
}
//generates random color between pink and blue
function randomColorPB()
{
    let r = Math.random() * 255, g = 0, b = Math.random() * 255;
    return "rgb(" + r + "," + g + "," + b + ")";
}

function CreateModelPanel(name)
{
    let panel = document.createElement("div");
    panel.style.background = `linear-gradient(${Math.floor(Math.random() * 360)}, ${randomColorBG()},#020005ee, ${randomColorPB()})`;
    let pc = document.createElement("img");
    pc.src = "profile_pics/" + name + ".png";
    let title = document.createElement("h2");
    title.innerHTML = name;
    panel.appendChild(pc);
    panel.appendChild(title);
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

                fetch(`data/models/${model}.json`).then((res)=>{
                    res.json().then((details)=>{
                        let panel = CreateDetailsPanel(details["description"] , details["links"]);
                        document.body.appendChild(panel);
                        panel.style.left = (document.body.offsetWidth / 2) - (panel.offsetWidth / 2) + "px";
                        panel.style.top = "45px";
                    })
                });

            };
            Modcon.appendChild(modelPanel);            
        });
    });
}

document.body.onload = ()=>{

    fetch("data/catagories.json").then((res)=>{
        res.json().then((data)=>{
            data["catagories"].forEach((catagory)=>{
                let button = document.createElement("button");
                button.innerHTML = catagory;
                button.onclick = ()=>{
                    ToggleContainer();
                    ShowModels(catagory);
                }
                document.getElementById("TypesContainer").appendChild(button);
            })
        });
    });
}