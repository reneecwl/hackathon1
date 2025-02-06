const cakesApi = new CakesApi();

const makeCard = (card, cardObj) => {
  card.innerHTML = `
    <img class="cakes-card__img" src="${cardObj.image}" alt="">
    <p class="cake__difficulty">Difficulty: ${cardObj.difficulty}</p>
    <h3 class="cakes-card__heading">${cardObj.title}</h3>
    <button class="button" id="${cardObj.id}"> See More</button>
    `;
};
const allCakes = (async function () {
  try {
    // const res = await cakesApi.getRandCakes();
    const cakesCards = document.querySelectorAll(".cakes-card");
    cakesCards.forEach((c) => {
      c.innerHTML = "<div></div><div></div><div></div>";
      c.classList.add("cakes-card--loading");
    });
    let res = [
      {
        id: "55",
        title: "Ultimate chocolate mousse cake",
        difficulty: "Medium",
        image: "https://apipics.s3.amazonaws.com/cakes_api/55.jpg",
      },
      {
        id: "56",
        title: "Lavender cupcakes",
        difficulty: "Easy",
        image: "https://apipics.s3.amazonaws.com/cakes_api/56.jpg",
      },
      {
        id: "57",
        title: "Chocolate and berry traybake",
        difficulty: "Easy",
        image: "https://apipics.s3.amazonaws.com/cakes_api/57.jpg",
      },
    ];

    if (!res) {
      document.querySelector(
        ".cakes"
      ).innerHTML = `<img class="error-cake" src="../assets/image.png" alt="Server Error Cake" />`;
      return;
    }
    setTimeout(() => {
      res.forEach((cake, indx) => {
        makeCard(cakesCards[indx], cake);
      });
      cakesCards.forEach((c) => c.classList.remove("cakes-card--loading"));
      const cakeButtons = document.querySelectorAll(".cakes-card .button");
      cakeButtons.forEach((b) =>
        b.addEventListener("click", async (event) => {
          // const cake = await cakesApi.getCake(event.target.id);
          const cake = {
            id: "5",
            title: "Vegan chocolate cake",
            difficulty: "Easy",
            portion: "Serves 12",
            time: "Hands-on time 40 min, plus cooling and a few hours firming; Oven time 1 hour 5-10 min",
            description:
              "Our vegan chocolate cake is dairy-free and egg-free and comes with a vegan buttercream, amaretto and jam filling, and is covered in a gorgeously silky ganache. It’s stop-you-in-your-tracks good!",
            ingredients: [
              "300ml unsweetened soy milk",
              "1 tbsp finely ground/milled chia seeds",
              "1 tbsp lemon juice",
              "1 tsp instant coffee powder",
              "2 tsp vanilla extract",
              "150g vegan spread, such as Vitalite or Flora 100% Natural, melted",
              "3 tbsp agave nectar",
              "175g caster sugar",
              "35g cocoa powder",
              "300g self-raising flour",
              "200g dairy-free dark chocolate (about 45% cocoa solids)",
              "250ml plant-based double cream alternative – we used Elmlea Plant",
              "1 tbsp agave nectar",
              "90g vegan spread",
              "1 tsp vanilla extract",
              "1 tbsp unsweetened soy milk",
              "2 1⁄2 tbsp cocoa, sifted",
              "180g icing sugar, sifted",
              "4-8 tbsp vegan amaretto",
              "6 tbsp good quality black cherry jam (see Tips)",
            ],
            method: [
              {
                "Step 1":
                  "Heat the oven to 160°C fan/ gas 4. Line the base and sides of the cake tin. In a large jug, whisk together the soy milk, chia, lemon juice, coffee powder, vanilla, melted spread and agave nectar. Set aside for 5 minutes (don’t worry if it looks curdled).",
              },
              {
                "Step 2":
                  "Sift the sugar, cocoa and flour into a large bowl. Pour in the wet mix, whisk with a balloon whisk until smooth, then spoon into the prepared tin, smoothing the top. Bake for 45 minutes, then cover loosely with foil and cook for 25-30 minutes until springy to the touch and a skewer pushed into the centre comes out clean. Transfer to a cooling rack for an hour, then remove from the tin and leave to cool completely (see Make Ahead).",
              },
              {
                "Step 3":
                  "For the ganache, put all the ingredients in a bowl set over a pan of barely simmering water. Stir occasionally until melted (or microwave on a medium heat for about 3 minutes). Remove from the heat and leave somewhere cool until it begins to firm up – this may take a few hours. To cool it faster, put the bowl in a larger bowl filled with iced water. Stir every minute or so to ensure it doesn’t get too firm – when you lift out the spoon and gently let a little ganache fall back onto the mix, it should briefly form a visible line (ribbon) on top.",
              },
              {
                "Step 4":
                  "For the buttercream, use an electric mixer to beat the spread until pale. Whisk in the vanilla and soy milk to combine. Add the cocoa and icing sugar, then beat until pale and fluffy.",
              },
              {
                "Step 5":
                  "To assemble, use a sharpknife to cut the cooled cake into 3 layers. Drizzle the cut side of each layer with 1-2 tbsp amaretto. (If you have time, put the drizzled layers in the freezer for an hour to firm up and make assembling/decorating easier.)",
              },
              {
                "Step 6":
                  "Spread the top of the bottom and middle layers with half the buttercream each, then add half the jam to each, spreading thinly until about 1cm from the edge. Stack the cake layers using the undecorated one as the top, then transfer to a serving plate.",
              },
              {
                "Step 7":
                  "Use a palette knife to spread the ganache on the sides so they’re well covered, then pile and swirl the rest on top. Leave the cake in a cool place for a few hours until firm enough to cut.",
              },
            ],
            image: "https://apipics.s3.amazonaws.com/cakes_api/5.jpg",
          };
          const modalOverlay = document.querySelector(".modal-overlay.hidden");
          console.log(modalOverlay);
          modalOverlay?.classList.remove("hidden");
          const closeIcon = document.createElement("img");
          closeIcon.setAttribute("src", "../assets/close.svg");
          const modal = document.querySelector(".modal");
          modal.innerHTML = "";
          modal.appendChild(closeIcon);
          modal.innerHTML += `        
        <h4 class="cake__description">${cake.description}</h4>

        <p class="cake__time">${cake.time}</p>

        <div>
            <details class="cake__ingredients">
                <summary class="cake__title">Ingredients</summary>
                <ul>
                  ${cake.ingredients.map((i) => "<li>" + i + "</li>").join("")}
                </ul>
              </details>
        </div>

        <div>
            <details class ="cake__method">
                <summary class = "cake__title">Method</summary>
                 <ol>
                    ${cake.method
                      .map(
                        (i, indx) => "<li>" + i["Step " + (indx + 1)] + "</li>"
                      )
                      .join("")}
                 </ol>
        </div>`;
          document
            .querySelector(".modal img")
            .addEventListener("click", () =>
              modalOverlay?.classList.add("hidden")
            );
        })
      );
    }, 1000);

    return res;
  } catch (error) {
    console.error(error);
  }
})();
