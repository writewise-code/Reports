document.addEventListener("DOMContentLoaded", function () {
    var baseCoverage = 86;
    var coverageIncrease = {
        insulin: 4,
        mec: 6,
        ophthalmic: 1
    };

    var coverageDisplay = document.querySelector('.coverage-congrats');
    var totalPriceDisplay = document.getElementById("price");

    function updateTotalPriceAndCoverage() {
        var totalPrice = 15; // Base price
        var totalCoverage = baseCoverage;

        if (document.getElementById("toggleInsulin").classList.contains('toggle-active')) {
            totalPrice += 3; // Insulin price
            totalCoverage += coverageIncrease.insulin;
        }

        if (document.getElementById("toggleMec").classList.contains('toggle-active')) {
            totalPrice += 6; // MEC price
            totalCoverage += coverageIncrease.mec;
        }

        if (document.getElementById("toggleOphthalmic").classList.contains('toggle-active')) {
            totalPrice += 1; // Ophthalmic price
            totalCoverage += coverageIncrease.ophthalmic;
        }

        totalPriceDisplay.textContent = totalPrice.toFixed(2);
        coverageDisplay.innerHTML = `Congrats 🎉<br><br>${totalCoverage}% of your historical generic claims are covered with this plan!`;
    }

    // Event listeners for toggle buttons
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function () {
            button.classList.toggle('toggle-active');
            updateTotalPriceAndCoverage();
        });
    });

    // Initial update
    updateTotalPriceAndCoverage();
});
