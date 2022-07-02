
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
    return Panel;
}

function ScaleHexPanelElem(Panel , ScaleFactor)
{
    for(let i = 0 ; i< Panel.children.length ; ++i)
    {
        for(let j = 0 ; j < Panel.children[i].children.length ; ++j)
        {
            Panel.children[i].children[j].style.transform = `scale(${ScaleFactor})`;
        }
    }
}

function CreateHexFlower()
{
    let Flower = document.createElement("div");
    
    Flower.className = "HexFlower";


    let FirstRow = CreateHexRowOdd(150 , 150 , 2);
    let SecondRow = CreateHexRowOdd(150 , 150 , 3);
    let ThirdRow = CreateHexRowOdd(150 , 150 , 2);

    Flower.appendChild(FirstRow);
    Flower.appendChild(SecondRow);
    Flower.appendChild(ThirdRow);

    return Flower;

}

function CreateHexCard()
{
    let Panel = document.createElement("div");
    Panel.className = "HexCard";

    let TopHex = document.createElement("div");

    TopHex.className = "TopHex";

    TopHex.appendChild(CreateHexRowOdd(100 , 100 , 1));
    TopHex.appendChild(CreateHexRowOdd(100 , 100 , 2));

    Panel.appendChild(TopHex);

    let BottomHex = document.createElement("div");

    BottomHex.className = "BottomHex";

    BottomHex.appendChild(CreateHexRowOdd(100 , 100 , 1));
    BottomHex.appendChild(CreateHexRowOdd(100 , 100 , 2));

    Panel.appendChild(BottomHex);

    document.body.appendChild(Panel);
}

document.body.onload = ()=>{

    let Panel = CreateHexPanel(Math.round(document.body.scrollWidth / 145) + 3, 
    Math.round(document.documentElement.scrollHeight / 145) + 3 
, 145);
    Panel.style.position = "absolute";
    Panel.style.left = "0px";
    Panel.style.top = "-70px";

    Panel.id = "BackgroundHexPanel";

    document.body.appendChild(Panel);

    let Flower = CreateHexFlower();

    Flower.onclick = ()=>{

        let panel = document.getElementById("BackgroundHexPanel");
        ScaleHexPanelElem(document.getElementById("BackgroundHexPanel") , 0);
        Flower.style.opacity = "0";
        setTimeout(()=>{
            panel.parentElement.removeChild(panel);
            Flower.parentElement.removeChild(Flower);
        } , 900);
    }
    document.body.appendChild(Flower);

    //CreateHexCard();

}
