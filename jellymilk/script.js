function ToggleContainer()
{
    document.getElementById("ModelsContainer").hidden ^= 1;
}

function ShowModels(modelType)
{
    fetch(`data/${modelType}.json`).then((res)=>{
        res.json().then((data)=>{
            console.log(data);
        });
    });
}