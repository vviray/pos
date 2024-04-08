document.addEventListener("DOMContentLoaded", function() {
    // Get the Add to Order buttons
    const addToOrderButtons = document.querySelectorAll('.btn.btn-info');
    
    addToOrderButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent card of the clicked button
            const parentCard = button.closest('.card-body');
            // Get the product name
            const productName = parentCard.querySelector('b').innerText;
            // Get the quantity
            const quantity = parseInt(parentCard.querySelector('input[name="quantity"]').value);
            // Calculate the total price
            const pricePerItem = parseFloat(productName.split(' - ')[1].split(' ')[0]);
            const totalPrice = pricePerItem * quantity;

            // Create a new card element for the ordered item
            const orderedItemCard = document.createElement('div');
            orderedItemCard.classList.add('card', 'mt-4');

            const orderedItemCardBody = document.createElement('div');
            orderedItemCardBody.classList.add('card-body');

            // Set the content of the ordered item card
            orderedItemCardBody.innerHTML = `<p>${productName} - ${quantity} item/s (${totalPrice} PHP)</p>`;

            // Append the ordered item card to the Ordered Items section
            document.querySelector('#ordered-items').appendChild(orderedItemCard);
            orderedItemCard.appendChild(orderedItemCardBody);
        });
    });

    // Handle voiding item
    const voidItemButton = document.getElementById('void-item');
    voidItemButton.addEventListener('click', function() {
        const orderedItemsContainer = document.getElementById('ordered-items');
        const lastItem = orderedItemsContainer.lastElementChild;
        if (lastItem) {
            orderedItemsContainer.removeChild(lastItem);
        }
    });

    // Handle payment
    const payButton = document.getElementById('pay');
    payButton.addEventListener('click', function() {
        const cashInput = document.getElementById('cash');
        const cashAmount = parseFloat(cashInput.value);
        const totalAmount = calculateTotalAmount();

        if (cashAmount >= totalAmount) {
            const change = cashAmount - totalAmount;
            alert(`Payment successful! Change: ${change.toFixed(2)} PHP`);
            clearOrderedItems(); // Optionally clear ordered items after payment
        } else {
            alert('Insufficient amount!');
        }
    });

    // Function to calculate the total amount
    function calculateTotalAmount() {
        let total = 0;
        const orderedItems = document.querySelectorAll('#ordered-items .card-body p');
        orderedItems.forEach(function(item) {
            const totalPriceString = item.innerText.split('(')[1].split(' ')[0];
            const totalPrice = parseFloat(totalPriceString);
            total += totalPrice;
        });
        return total;
    }

    // Function to clear ordered items
    function clearOrderedItems() {
        const orderedItemsContainer = document.getElementById('ordered-items');
        orderedItemsContainer.innerHTML = ''; // Clear the content
    }
});
