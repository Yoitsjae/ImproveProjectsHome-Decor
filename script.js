const responses = {
    "pool coping": "Pool coping is the material or design that forms the top edge of a swimming pool. It serves several important functions:\n\n" +
                    "1. **Finish and Look:** It provides a finished, clean look to the edge of the pool, enhancing the overall appearance of the pool area.\n" +
                    "2. **Safety:** It helps prevent slipping and provides a safe, comfortable edge for people to walk on or sit by.\n" +
                    "3. **Protection:** It protects the pool structure from damage by directing water away from the pool walls and preventing erosion or cracking.\n" +
                    "4. **Sealing:** It can help in sealing the pool’s edge, preventing water from seeping behind the pool and causing damage.",
    
    "solid boundary walls": "Solid boundary walls are constructed to define and protect the perimeter of a property. They provide security, privacy, and enhance the visual appeal of the property. They are built using durable materials and designed to withstand environmental elements.",

    "retaining walls": "Retaining walls are used to hold back soil and prevent erosion. They are typically constructed to create level areas on sloped terrain or to manage water runoff. They can be built using various materials, including concrete, stone, and timber.",

    "wall cladding": "Wall cladding involves applying a layer of material to the exterior or interior walls of a building. This can be for aesthetic purposes, insulation, or protection against weather. Cladding materials can include wood, metal, brick, or stone.",

    "bomas/fireplaces": "Bomas and fireplaces are outdoor features designed for social gatherings and heating. Bomas are typically circular fire pits with seating around them, while fireplaces can be built as standalone structures or integrated into outdoor living areas.",

    "water features": "Water features include elements such as fountains, waterfalls, and ponds that add aesthetic value and a sense of tranquility to outdoor spaces. They can be customized to fit the style and scale of the garden or landscape.",

    "renovations": "Renovations involve updating or restoring parts of a building to improve its appearance, functionality, or value. This can include remodeling rooms, updating fixtures, or repairing structural elements.",

    "pool copping": "Pool copping (often referred to as coping) is the material or design that forms the top edge of a swimming pool. It provides a finished look, adds safety by reducing slipperiness, protects the pool structure, and can help in sealing the pool edge.",

    "garden edging": "Garden edging defines the boundary between different areas of the garden, such as lawns and flower beds. It helps to keep mulch or soil in place and creates a neat and tidy appearance.",

    "tiling": "Tiling involves installing tiles on floors, walls, or other surfaces. It can be used for decorative or functional purposes and comes in a variety of materials, including ceramic, porcelain, and natural stone.",

    "paving": "Paving refers to the installation of hard surfaces such as driveways, pathways, and patios. Paving materials can include bricks, stones, concrete, and asphalt, and are chosen based on durability, aesthetics, and functionality.",

    "brickwork": "Brickwork involves the construction or repair of structures using bricks. This can include walls, paths, and other features. Brickwork requires skill in laying and bonding bricks to ensure structural integrity and aesthetic appeal.",

    "default": "I'm here to help with information about our services, including pool coping, solid boundary walls, retaining walls, and more. If you have a specific question about a service or need assistance, please ask!"
};

document.getElementById('inquiry-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value.toLowerCase().trim();
    const chat = document.getElementById('chat');
    const newUserMessage = document.createElement('div');
    newUserMessage.className = 'user-message';
    newUserMessage.textContent = userInput;
    chat.appendChild(newUserMessage);

    const response = responses[userInput] || responses['default'];
    setTimeout(() => {
        const newAssistantMessage = document.createElement('div');
        newAssistantMessage.className = 'assistant-message';
        newAssistantMessage.textContent = response;
        chat.appendChild(newAssistantMessage);
        chat.scrollTop = chat.scrollHeight;
    }, 1000);

    document.getElementById('user-input').value = '';
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const otherInfo = document.getElementById('other-info').value.trim();

    if (name && email) {
        const confirmation = confirm("Do you agree to have your information used and allow us to reach out to you?");
        if (confirmation) {
            const formData = {
                name: name,
                email: email,
                otherInfo: otherInfo
            };

            // Send the data to the server (example endpoint)
            fetch('/save-user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Your information has been saved successfully!');
                } else {
                    alert('There was an error saving your information. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error saving your information. Please try again.');
            });

            // Send email with form data
            const mailtoLink = `mailto:improveprojects@gmail.com?subject=New%20Signup&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AOther%20Info:%20${encodeURIComponent(otherInfo)}`;
            window.location.href = mailtoLink;

            // Reset form fields
            document.getElementById('signup-form').reset();
        }
    } else {
        alert('Please fill in all required fields.');
    }
});
