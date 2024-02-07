document.addEventListener("DOMContentLoaded", function () {
    const additionalPrices = {
        insulin: 10,
        mec: 6,
        inhalers: 8,
        analgesic: 4
    };
    const coverageIncrease = {
        insulin: 5,
        mec: 4,
        inhalers: 3,
        analgesic: 1
    };

    let baseCoverage = 86; // Starting point of coverage percentage
    let baseBudget = 20; // Starting budget

    function updateTotalPriceAndCoverage() {
        let totalPrice = baseBudget;
        let totalCoverage = baseCoverage;

        Object.keys(additionalPrices).forEach(feature => {
            const toggleElement = document.getElementById(`toggle${capitalizeFirstLetter(feature)}`);
            if (toggleElement.classList.contains('toggle-active')) {
                totalPrice += additionalPrices[feature];
                totalCoverage += coverageIncrease[feature];
            }
        });

        document.getElementById('price').textContent = totalPrice.toFixed(2);
        document.querySelector('.coverage-congrats').innerHTML = `<strong>Congrats</strong> 🎉<br>Your formulary covers more than ${totalCoverage}% of Generic Claims in the US!`;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function syncToggles(clickedFeature, activating) {
        const allFeatures = ['insulin', 'mec', 'inhalers', 'analgesic'];
        const clickedIndex = allFeatures.indexOf(clickedFeature);

        if (activating) {
            // Activate all previous features up to and including the clicked one
            allFeatures.forEach((feature, index) => {
                if (index <= clickedIndex) {
                    document.getElementById(`toggle${capitalizeFirstLetter(feature)}`).classList.add('toggle-active');
                    document.getElementById(feature + 'Option').classList.add('card-selected');
                }
            });
        } else {
            // Deactivate clicked feature and all subsequent features
            allFeatures.forEach((feature, index) => {
                if (index >= clickedIndex) {
                    document.getElementById(`toggle${capitalizeFirstLetter(feature)}`).classList.remove('toggle-active');
                    document.getElementById(feature + 'Option').classList.remove('card-selected');
                }
            });
        }

        updateTotalPriceAndCoverage();
    }

    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function () {
            const featureId = this.id.replace('toggle', '').toLowerCase();
            // Determine if we are activating or deactivating the feature
            const activating = !this.classList.contains('toggle-active');

            syncToggles(featureId, activating);
        });
    });
});
