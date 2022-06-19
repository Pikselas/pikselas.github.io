function ToggleContainer()
{
    document.getElementById("ModelsContainer").hidden ^= 1;
}

async function GetModels(modelType)
{
    let res = await fetch(`https://pikselas.github.io/jellymilk/data/${modelType}.json`);
    if(res.ok)
    {
        return await res.json();
    }
}

function ShowModels(modelType)
{
    let Modcon = document.getElementById("ModelsContainer").children[1];
    Modcon.innerHTML = "";
    GetModels(modelType).then((models)=>{
        Object.keys(models).forEach((model)=>{
            console.log(model);
        });
    })
}