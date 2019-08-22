describe('Default visit', function() {
    it('Successfully loads', function() {
        cy.visit('/');

        cy.get("#mapcore_search_results_container").find(".search-result").should('have.length', 5);

        cy.get("#mapcore_search_input").type('heart').should('have.value', 'heart');

        cy.get(".search-button.el-button.mapcore-search-button").click();

        cy.get("#mapcore_search_results_container").find(".search-result").should('have.length', 5);
    })
})