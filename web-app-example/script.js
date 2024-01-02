document.addEventListener("DOMContentLoaded", function () {
    var baseCoverage = 86;
    var additionalPrices = {
        insulin: 3,
        mec: 6,
        ophthalmic: 1
    };
    var coverageIncrease = {
        insulin: 4,
        mec: 6,
        ophthalmic: 1
    };

    var coverageDisplay = document.querySelector('.coverage-congrats');
    var basePriceDisplay = document.querySelector('.price'); // Select the base price element
    var totalPriceDisplay = document.getElementById("price");

    var fileUpload = document.getElementById('fileUpload');
    var contentWrapper = document.getElementById('contentWrapper');
    var loadingBar = document.getElementById('loadingBar');
    var loadingBarText = loadingBar.querySelector('p'); // Select the loading bar text element

    fileUpload.addEventListener('change', function () {
        if (this.files.length > 0) {
            loadingBar.style.display = 'block';
            let progress = 0;
            const interval = setInterval(function () {
                progress += 5; // Increment progress
                document.querySelector('.progress').style.width = progress + '%';
                if (progress === 50) {
                    loadingBarText.textContent = 'Predicting optimal formulary...'; // Change text at 50%
                }
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(function () {
                        loadingBar.style.display = 'none';
                        contentWrapper.style.display = 'block';
                    }, 500); // Short delay after reaching 100%
                }
            }, 150); // Update interval (150ms for a quicker simulation)
        }
    });

    function updateTotalPriceAndCoverage(budget) {
        var totalPrice = budget; // Start with the budget as the base price
        var totalCoverage = baseCoverage;

        Object.keys(additionalPrices).forEach(function (key) {
            if (document.getElementById("toggle" + key.charAt(0).toUpperCase() + key.slice(1)).classList.contains('toggle-active')) {
                totalPrice += additionalPrices[key]; // Add the option price
                totalCoverage += coverageIncrease[key];
            }
        });

        basePriceDisplay.textContent = `Base Price: $${budget}`; // Update the base price display
        totalPriceDisplay.textContent = totalPrice.toFixed(2);
        coverageDisplay.innerHTML = `Congrats 🎉<br><br>${totalCoverage}% of your historical generic claims are covered with this plan!`;
    }

    // Event listeners for toggle buttons
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('toggle-active');
            var budget = parseInt(document.getElementById('budgetSlider').value);
            updateTotalPriceAndCoverage(budget);
        });
    });

    // Function to update plan prices based on the slider input
    function updatePlanPrices() {
        var budget = parseInt(document.getElementById('budgetSlider').value);
        document.getElementById('budgetDisplay').textContent = `$${budget}`; // Display the slider value with a dollar sign

        updateTotalPriceAndCoverage(budget); // Update the total price and coverage
    }

    // Event listener for the slider input
    document.getElementById('budgetSlider').addEventListener('input', updatePlanPrices);

    // Initial update with the default slider value
    updatePlanPrices();
});
