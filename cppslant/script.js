var LastClickedItem = null;

function ItemTrickPanel(ev)
{
    if(LastClickedItem != ev.target)
    {
        let Panel = document.createElement("div")
        Panel.className = "Tip";
        Panel.appendChild(document.createElement("h1"));
        Panel.children[0].innerHTML = "Title";
        Panel.appendChild(document.createElement("div"));
        document.body.appendChild(Panel)

        document.body.onclick = (ev) => {

            if(!Panel.contains(ev.target) && ev.target != LastClickedItem)
            {
                if(document.body.contains(Panel))
                {
                    document.body.removeChild(Panel);
                }
                LastClickedItem = null;
            }
        };
    }
    LastClickedItem = ev.target;
}