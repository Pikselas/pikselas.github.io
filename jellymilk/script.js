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

function CreateModelPanel(name)
{
    let panel = document.createElement("div");
    let pc = document.createElement("img");
    pc.src = pic;
    let title = document.createElement("h2");
    title.innerHTML = "profile_pics/" + name + ".png";
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
            Modcon.appendChild(CreateModelPanel(model));            
        });
    });
}