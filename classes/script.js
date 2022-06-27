
function CreateHex(width , height)
{
    let HalfofHeight = Math.floor(height / 2);
    let Parent = document.createElement("div");
    Parent.className = "Hex";
    let Top = document.createElement("div");     
    let Middle = document.createElement("div");
    let Bottom = document.createElement("div");

    Top.style.borderRightWidth = 
    Top.style.borderLeftWidth =
    Bottom.style.borderRightWidth =
    Bottom.style.borderLeftWidth =  Math.floor(width / 2) + "px";

    Top.style.borderBottomWidth = Bottom.style.borderTopWidth = Math.floor(HalfofHeight / 2) + "px";

    Middle.style.width = width + "px";
    Middle.style.height = HalfofHeight + "px";

    Parent.appendChild(Top);
    Parent.appendChild(Middle);
    Parent.appendChild(Bottom);
    return Parent;
}

function CreateHexHalfRightSided(width , height)
{
    let Hex = CreateHex(width , height);
    Hex.className = "HalfHexRightSided";
    Hex.children[0].style.borderLeftWidth = "0px";
    Hex.children[1].style.width = Math.floor(width / 2) + "px"
    Hex.children[2].style.borderLeftWidth = "0px";
    return Hex;
}

function CreateHexHalfLeftSided(width , height)
{
    let Hex = CreateHex(width , height);
    Hex.className = "HalfHexLeftSided";
    Hex.children[0].style.borderRightWidth = "0px";
    Hex.children[1].style.width = Math.floor(width / 2) + "px"
    Hex.children[2].style.borderRightWidth = "0px";
    return Hex;
}

function CreateHexRowOdd(per_width , per_height , hex_count)
{
    let Row = document.createElement("div");
    Row.className = "HexRowOdd";
    let pos = 0;
    for(let i = 0 ; i < hex_count ; ++i)
    {
        let hex = CreateHex(per_width , per_height);
        hex.style.left = pos + "px";
        Row.appendChild(hex);
        pos += per_width + 2;
    }
    return Row;
}

function CreateHexRowEven(per_width , per_height , hex_count)
{
    let Row = document.createElement("div");
    Row.className = "HexRowEven";
    let pos = (per_width / 2) + 2;
    let FirstHex = CreateHexHalfRightSided(per_width , per_height);
    FirstHex.style.left = "0px";
    Row.appendChild(FirstHex);
    for(let i = 0 ; i < hex_count - 2 ; ++i)
    {
        let hex = CreateHex(per_width , per_height);
        hex.style.left = pos + "px";
        Row.appendChild(hex);
        pos += per_width + 2;
    }

    let LastHex = CreateHexHalfLeftSided(per_width , per_height);
    LastHex.style.left = pos + "px";
    Row.appendChild(LastHex);
    return Row;
}

function CreateHexPanel(row_count , column_count , hex_size)
{
    let PosBy = hex_size - ((hex_size / 4) - 2);
    let Panel = document.createElement("div");
    let tracker = 0;
    let pos = 0;
    for(let i = 0 ; i < column_count ; ++i)
    {
        let hexRow = tracker == 0 ? CreateHexRowOdd(hex_size , hex_size , row_count) : CreateHexRowEven(hex_size , hex_size , row_count + 1);
        hexRow.style.top = pos + "px";
        Panel.appendChild( hexRow );
        tracker ^= 1;
        pos += PosBy;
    }
    return Panel
}