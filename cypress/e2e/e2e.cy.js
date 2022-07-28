
  it('we write and fill todo input', () => {
    cy.visit("/")
    const input = cy.get('#todo_input')
    input.type("Hello")
    const button = cy.get('.primary')
    button.click()
    const todoHolder = cy.get('#todos_holder')
    todoHolder.should("contain" , "Hello")

  })


  it("we add a empty input"  , ()=>{
    const button = cy.get('.primary')
    button.click()
    const todoHolder = cy.get('#todos_holder')
    const todos = todoHolder.find("[role='todo_con']")
    todos.should('have.length' , 2)

  })

  it('click to  delete todo' , ()=>{
    const delBtn = cy.get("#todos_holder [role='todo_con']:nth-child(2) [role='deletingItems']").click()
    cy.get("#todos_holder").should('have.length' , 1)

  })


  it("when click on the check radio it is become active" , ()=>{
  cy.get('.checkmark').click()
  cy.get('[role="checkbox"]').should("be.checked")

  })


  it("when click on the edit , edit section display , and we can edit todos " , ()=>{

    cy.get("#editing").should('not.exist')
    cy.get('[role="editing"] > .icon').click()
    cy.get("#editing").should('be.exist')
    cy.get('#editing > #todo_input').type(" im changing this todo")
  cy.get('[role="editing_btn"]').click()
  cy.get("#editing").should('not.exist')
  cy.get('#todos_holder').should("contain" , "im changing this todo")
  })


  it("when click on the edit , edit but click on the cancel will happen nothing in the ui " , ()=>{

    cy.get("#editing").should('not.exist')
    cy.get('[role="editing"] > .icon').click()
    cy.get("#editing").should('be.exist')
    cy.get('#editing > #todo_input').clear().type(" Siavash")
      cy.get('[role="cancel_editing"]').click()
  cy.get("#editing").should('not.exist')
  cy.get('#todos_holder').should("not.contain" , "Siavash")

  })
