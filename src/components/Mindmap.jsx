import {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {Box} from "@mui/material";


const dishDetails = {
    "Bun Cha": {
        ingredients: ["Grilled Pork 🐖", "Rice Noodles 🍜", "Herbs 🌿", "Fish Sauce 🐟"],
        history: ["Iconic Hanoi experience 🏙️", "Popular since the 20th century 🕰️", "Originated in Hanoi 🇻🇳"]
    },
    "Pho": {
        ingredients: ["Rice noodles 🍜", "Beef broth 🐄", "Beef 🥩", "Herbs 🌱", "Spices 🧄"],
        history: ["From Hanoi in 19th century 🏙️", "Popularized in the 20th century 🕰️", "International popularity 🌐"]
    },
    "Banh Mi": {
        ingredients: ["French baguette 🥖", "Pork 🐖", "Pate 🥖", "Pickled vegetables 🥒", "Herbs 🌿", "Spices 🌶️"],
        history: ["From Hanoi in 19th century 🏙️", "Influenced by French cuisine 🇫🇷", "Vietnamese Baguette 👀"]
    },
    "Goi Cuon": {
        ingredients: ["Mango 🥭", "Shrimp 🦐", "Carrots 🥕", "Vegetables 🌽"],
        history: ["Viet salad 😎🤙", "A popular street food 🍽️"]
    },
    "Goi Xoai": {
        ingredients: ["Rice paper rolls 🍚", "Pork 🐖", "Shrimp 🦐", "Mushrooms 🍄", "Herbs 🌿", "Vegetables 🥦"],
        history: ["From Hanoi in 19th century 🏙️", "A popular street food 🍽️"]
    },
    "Bun Rieu": {
        ingredients: ["Rice vermicelli 🍜", "Crab broth 🦀", "Crab meat 🦀", "Tofu 🧈", "Herbs 🌿", "Spices 🧂"],
        history: ["Mekong Delta region of Vietnam 🌊", "Very yummy 😋"]
    },
    "Banh Xeo": {
        ingredients: ["Rice flour 🍚", "Eggs 🍳", "Turmeric 🧡", "Shrimp 🦐", "Pork 🐖", "Vegetables 🥬"],
        history: ["Central Vietnam 🏞️", "A popular street food 🍽️"]
    },
    "Ca Phe Sua Da": {
        ingredients: ["Coffee ☕️", "Condensed milk 🥛", "Ice 🧊"],
        history: ["1857 from French Catholic Priest ⏳", "A popular drink 🥤"]
    },

    "Bun Bo Hue": {
        ingredients: ["Rice vermicelli 🍜", "Beef 🐄", "Pork 🐖", "Shrimp 🦐", "Lemongrass 🌱", "Chili 🌶️", "Herbs 🌿", "Spices 🧄"],
        history: ["Hue, Vietnam in the 19th century 🏞️"]
    },
    "Cha Gio": {
        ingredients: ["Pork 🐖", "Shrimp 🦐", "Mushrooms 🍄", "Bean sprouts 🌱", "Vegetables 🥗", "Rice paper 🍚"],
        history: ["Another name: Nem 🇻🇳", "A popular street food 🍽️", "National dish 💪"]
    },
    "My Quang": {
        ingredients: ["Rice noodles 🍜", "Shrimp 🦐", "Pork 🐖", "Chicken 🍗", "Vegetables 🥕", "Spices 🧂"],
        history: ["Quang Nam, Vietnam 📍"]
    },
    "Lau Viet Nam": {
        ingredients: ["Beef 🐄", "Pork 🐖", "Seafood 🦑", "Chicken 🍗", "Vegetables 🥦", "Spices 🌶️"],
        history: ["Central Vietnam in the 19th century 🇻🇳"]
    },
    "Banh Cuon": {
        ingredients: ["Steamed rice cakes 🍚", "Pork 🐖", "Mushrooms 🍄", "Herbs 🌿", "Spices 🧄"],
        history: ["Northern Vietnam 📍", "Suitable for Breakfast 😎"]
    },
    "Com Tam": {
        ingredients: ["Broken rice 🍚", "Grilled pork 🐖", "Eggs 🍳", "Vegetables 🥬", "Herbs 🌱", "Spices 🌶️"],
        history: ["Ho Chi Minh 📍, Vietnam", "Southern Staple dish 💪"]
    },
    "Bun Thit Nuong": {
        ingredients: ["Rice vermicelli 🍜", "Grilled pork 🐖", "Herbs 🌱", "Spices 🧂"],
        history: ["Southern Vietnam 📍", "19th century 🏙"]
    },
    "Che": {
        ingredients: ["Sweetened rice porridge 🍚", "Fruits 🍎", "Nuts 🥜", "Seeds 🌰", "Spices 🧁"],
        history: ["Very very delicious 🤌", "A popular dessert 🍮"]
    },
    "Banh Bao": {
        ingredients: ["Steamed rice flour buns 🍙", "Pork 🐖", "Shrimp 🦐", "Mushrooms 🍄", "Vegetables 🌽"],
        history: ["Influenced by the Chinese baozi 🥟", "Breakfast staple for Viets 🇻🇳"]
    },
    "Hu Tieu": {
        ingredients: ["Rice noodles 🍜", "Pork 🐖", "Shrimp 🦐", "Fish balls 🐟", "Vegetables 🥦", "Spices 🌶️"],
        history: ["19th century from Teochew People 🍜", "Migrated to Vietnam from Guangdong province 🏃"]
    },
    "Hu Tieu Nam vang": {
        ingredients: ["Rice noodles 🍜", "Pork 🐖", "Shrimp 🦐", "Fish balls 🐟", "Vegetables 🥬", "Spices 🌶️"],
        history: ["Originally from Cambodia (Phnom Penh Noodle)🇰🇭"]
    },
    "Banh Canh": {
        ingredients: ["Thick rice noodles 🍜", "Pork 🐖", "Shrimp 🦐", "Fish balls 🐟", "Vegetables 🥕", "Spices 🧄"],
        history: ["Trang Bang District, Tay Ninh Province 📍", "Usually served for Breakfast 🤌"]
    },
    "Banh Tom": {
        ingredients: ["Shrimp cakes 🦐", "Rice paper 🍚", "Herbs 🌱", "Vegetables 🥗"],
        history: ["From Hanoi Capital 🇻🇳", "Popular street vendor food"]
    },
    "Banh Trang Tron": {
        ingredients: ["Rice Paper 🍚", "Pork 🐖", "Vegetables 🌽"],
        history: ["OG Viet Street Food 😎🤙"]
    },
    "Bun Bo Nam Bo": {
        ingredients: ["Beef 🐄", "Pork 🐖", "Noodles 🍜", "Fresh Herbs 🌱"],
        history: ["Hanoi, 1980 🇻🇳", "Popular lunch choice"]
    },
    "Bun Moc": {
        ingredients: ["Chả Lụa 🐖", "Pork Paste Balls 🐖", "Noodles 🍜", "Fresh Herbs 🌱"],
        history: ["Moc Village, Hanoi 🏙️"]
    },
    "Nem Nuong": {
        ingredients: ["Grilled Pork 🐖", "Rice Paper Wrap 🍚", "Fish Sauce 🐟"],
        history: ["Khanh Hoa, Nha Trang 🌊", "Popular snack 🤪"]
    },
    "Cao Lau": {
        ingredients: ["Thick Rice Noodles 🍜", "Barbecue Pork 🐖", "Greens 🥬", "Croutons 🍞", "Herbs 🌿", "Soy Sauce 🍶"],
        history: ["Hoi An 🏯", "Unique regional dish 🌟", "Historically exclusive 🏰"]
    }




};



const createHierarchyFromDish = (dishName) => {
    const dish = dishDetails[dishName];
    return {
        name: dishName,
        children: [
            {
                name: 'Ingredients',
                children: dish.ingredients.map(ingredient => ({ name: ingredient }))
            },
            {
                name: 'History',
                children: dish.history.map(history => ({ name: history }))
            }
        ]
    };
};

function Mindmap({dishname}) {
    const svgRef = useRef();
    const [data, setData] = useState(null);




    useEffect(() => {
        if (dishname) {
            const hierarchyData = createHierarchyFromDish(dishname);
            const rootNode = d3.hierarchy(hierarchyData);

            const treeLayout = d3.tree().size([800, 700])
            treeLayout(rootNode);
            setData(rootNode);
        }
    }, [dishname]);

    useEffect(() => {
        if (!data) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear svg content



        const nodes = data.descendants();
        const links = data.links();

        const graphGroup = svg.append("g")
            .attr("transform", `translate(650,0)`); // Adjusted offset

        // Create links
        graphGroup.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x)
            )
            .style("fill", "none")
            .style("stroke", "#100")
            .style("stroke-width", "1px");

        // Create nodes
        graphGroup.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("cx", d => d.y)
            .attr("cy", d => d.x)
            .attr("r", 10)
            .style("fill", "d => d.data.color");

        // Append text labels to nodes
        graphGroup.selectAll(".label")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("x", d => d.y)
            .attr("y", d => d.x + 30 ) // Offset the text above the node
            .style("text-anchor", "middle")
            .text(d => d.data.name)
            .style("font-size", "15px")


            setTimeout(() => {
                try {
                    const bounds = svg.node().getBBox();
                    const width = bounds.width + bounds.x * 2; // Add some padding
                    const height = bounds.height + bounds.y * 2; // Add some padding


                    // Set the width and height of the SVG dynamically
                    svg.attr("width", width)
                       .attr("height", height);
                } catch (e) {
                    console.error("Error in calculating SVG dimensions:", e);
                }
            }, 0);



    }, [data]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-100px',  maxWidth: '100vw', overflowX: 'hidden' }}>
            <svg ref={svgRef} viewBox="0 0 width height" preserveAspectRatio="xMinYMin meet"  />
        </Box>
    );
}

export default Mindmap;
