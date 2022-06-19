function GetModels(modelType)
{
    let prms = await fetch("data/models.json");
    return prms.json();
}