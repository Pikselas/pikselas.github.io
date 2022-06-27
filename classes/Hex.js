class Hex
{
    constructor(width , height)
    {
        let HalfofHeight = Math.floor(height / 2);
        this.parent = document.createElement("div");
        this.parent.className = "Hex";
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

        this.parent.appendChild(Top);
        this.parent.appendChild(Middle);
        this.parent.appendChild(Bottom);
    }
}