
function ToggleContainer()
{
    document.getElementById("ModelsContainer").hidden ^= 1;
}

async function GetModels(modelType)
{
    let res = await fetch(`data/${modelType}.json`);
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

function CreateModelPanel(name)
{
    let panel = document.createElement("div");
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
                        panel.style.left = (document.body.offsetWidth / 2) + (panel.offsetWidth / 2) + "px";
                        panel.style.top = "45px";
                    })
                });

            };
            Modcon.appendChild(modelPanel);            
        });
    });
}