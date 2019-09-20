describe('Default visit', function() {
    it('MAPcore page', function() {

        cy.server();

        cy.route('GET', '/flatmaps/flatmap/human/mvtiles/**').as('somebugs');

        cy.route('POST', '/map/biolucida/**').as('biolucida');

        cy.visit('/');

        cy.wait(['@biolucida']);

        cy.get("#mapcore_search_results_container").find(".search-result").should('have.length', 5);

        cy.wait(1000);

    });
    it('Search for bladder', function() {
        cy.get("#mapcore_search_input").clear().type('bladder').should('have.value', 'bladder');

        cy.server();

        cy.route('GET', '/map/knowledgebase/**').as('knowledgebase');

        cy.get(".search-button.el-button.mapcore-search-button").click();

        cy.wait('@knowledgebase');

        cy.get("#mapcore_search_results_container").find(".search-result").should('have.length', 5);

        cy.contains('No results found').should('not.be.visible'); 
    });
    it('Search for giraffe', function() {
        cy.get("#mapcore_search_input").clear().type('giraffe').should('have.value', 'giraffe');

        cy.server();

        cy.route('GET', '/map/knowledgebase/**').as('knowledgebase');

        cy.get(".search-button.el-button.mapcore-search-button").click();

        cy.wait('@knowledgebase');

        cy.contains('No results found').should('be.visible'); 
    });
    it('Search for heart', function() {
        cy.get("#mapcore_search_input").clear().type('heart').should('have.value', 'heart');

        cy.server();

        cy.route('GET', '/map/knowledgebase/**').as('knowledgebase');

        cy.get(".search-button.el-button.mapcore-search-button").click();

        cy.wait('@knowledgebase');

        cy.get("#mapcore_search_results_container").find(".search-result").should('have.length', 5);

        cy.contains('No results found').should('be.hidden'); 
    });
    it('Open results in full', function() {

        cy.server();

        cy.route('GET', '/map/biolucida/**').as('biolucida');

        cy.get("#mapcore_search_results_container").get(".search-result").get("#mapcore_search_result_data_viewer_map").parent().click();

        cy.wait('@biolucida');

        cy.get("#mapcore_search_results_container").get(".search-result-in-full").should('be.visible'); 
    });
    it('Open 3D tab', function() {

        cy.server();

        cy.route('GET', '/ISAN/scaffold/**').as('scaffold');

        cy.get("#mapcore_search_results_container").get(".search-result-in-full").get("#mapcore_search_result_scaffold_map").should('be.visible').click(); 

        cy.wait('@scaffold');

        cy.get(".maptab-tab-content").should('have.length', 3).get("#organsDisplayArea");

    });
})
