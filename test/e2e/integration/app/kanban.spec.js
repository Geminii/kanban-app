function createMatterInStage(stageIndex) {
  cy.get('[data-test=stage-add-matter]').eq(stageIndex).click()
  cy.get('[data-test=matter-input-title]').type('A new matter{enter}')
}

function editFirstMatterTitle() {
  const matterEditedTitle = 'My first matter edited'
  cy.get('[data-test=matter-title]').first().click()
  cy.get('[data-test=matter-input-title]').type(
    `{selectAll}${matterEditedTitle}{enter}`
  )

  cy.get('[data-test=matter-title]')
    .first()
    .should('contain', matterEditedTitle)
}

function displayOptions(option) {
  cy.get('[data-test=options-dropdown]').click()
  cy.get(`[data-test=options-dropdown-${option}]`).click()
}

function checkDisplayOptions() {
  const displayOptions = ['Show colors', 'Show references']
  cy.get('[data-test=options-dropdown-open]').then(($dropdown) => {
    cy.wrap($dropdown)
      .find('[data-test=options-dropdown-list] > label')
      .should('have.length', 2)
      .each(($label, index) => {
        expect($label.text()).to.contain(displayOptions[index])
      })
  })
}

function checkStagesCounter(stagesCounter) {
  cy.get('[data-test=stage-counter]')
    .should('have.length', 3)
    .each(($counter, index) => {
      expect($counter.text()).to.contain(stagesCounter[index])
    })
}

context('Kanban', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  describe('When page is initially opened', () => {
    it('3 column should appear', () => {
      cy.get('[data-test=stage-title]').should('have.length', 3)
    })

    it('3 matters should be exist', () => {
      cy.get('[data-test=matter-title]').should('have.length', 3)
    })

    it('2 matters should be in first column - 1 matter in second column', () => {
      checkStagesCounter([2, 1, 0])
    })

    it('2 display options available', () => {
      checkDisplayOptions()
    })
  })

  describe('Display actions', () => {
    it('Click to display colors', () => {
      displayOptions('colors')

      cy.get('[data-test=matter-card]').first().should('have.attr', 'style')
    })

    it('Click to display references', () => {
      displayOptions('references')

      cy.get('[data-test=matter-card]')
        .first()
        .find('[data-test=matter-reference]')
        .should('not.be.visible')
    })
  })

  describe('New matter', () => {
    it('Create new matter in first column - only title', () => {
      createMatterInStage(0)
      cy.get('[data-test=stage-counter]')
        .first()
        .then(($counter) => {
          expect($counter.text()).to.contain(3)
        })
    })

    it('Create new matter - title & color', () => {
      const matterTitle = 'A new matter'
      cy.get('[data-test=stage-add-matter]').first().click()
      cy.get('[data-test=matter-input-title]').type(matterTitle)
      cy.get('[data-test=matter-colorpicker]').click()

      // Pick the color
      const color = '#000000'
      cy.get('.verte__input').type(`{selectAll}${color}{enter}`)
      cy.get('.verte__close').click()

      // Save the matter
      cy.get('[data-test=matter-add]').click()

      cy.get('[data-test=matter-card]')
        .eq(2)
        .then(($matter) => {
          cy.wrap($matter).should(
            'have.attr',
            'style',
            'border-color: rgb(0, 0, 0);'
          )

          cy.wrap($matter)
            .find('[data-test=matter-title]')
            .should('contain', matterTitle)

          cy.wrap($matter)
            .find('[data-test=matter-reference]')
            .should('contain', '#4')
        })
    })
  })

  describe('Editing matter', () => {
    it('Change the title of first matter', () => {
      editFirstMatterTitle()
    })

    it('Change the color of second matter', () => {
      cy.get('[data-test=matter-title]').first().click()
      cy.get('[data-test=matter-colorpicker]').click()

      // Pick the new color
      const color = '#ffffff'
      cy.get('.verte__input').type(`{selectAll}${color}{enter}`)
      cy.get('.verte__close').click()

      // Save the matter
      cy.get('[data-test=matter-add]').click()
      cy.wait(250)

      cy.get('[data-test=matter-card]')
        .first()
        .then(($matter) => {
          cy.wrap($matter).should(
            'have.attr',
            'style',
            'border-color: rgb(255, 255, 255);'
          )
        })
    })

    it('Cancel the changes to define new title of first matter', () => {
      const matterEditedTitle = 'My first matter edited'
      cy.get('[data-test=matter-title]').first().click()
      cy.get('[data-test=matter-input-title]').type(
        `{selectAll}${matterEditedTitle}`
      )

      // Click on cancel button
      cy.get('[data-test=matter-cancel]').click()

      cy.get('[data-test=matter-card]')
        .first()
        .then(($matter) => {
          cy.wrap($matter)
            .find('[data-test=matter-title]')
            .should('contain', 'My first matter')
        })
    })

    it('Delete abort validation of first matter', () => {
      cy.get('[data-test=matter-title]').first().click()
      cy.get('[data-test=matter-delete]').click()

      cy.get('[data-test=matter-no-confirmation]').click()
      cy.get('[data-test=matter-delete]').should('be.visible')
    })

    it('Delete validation of first matter', () => {
      cy.get('[data-test=matter-title]').first().click()
      cy.get('[data-test=matter-delete]').click()

      cy.get('[data-test=matter-confirmation]').click()
      cy.get('[data-test=stage-counter]')
        .first()
        .then(($counter) => {
          expect($counter.text()).to.contain(1)
        })
    })
  })

  describe('Drag matter from stage to another one', () => {
    it('Drag `My third matter` above the `My first matter` - in same stage', () => {
      cy.get('[data-test=matter-card]').eq(2).drag('.stage-draggable-0')
      checkStagesCounter([3, 0, 0])
    })

    it('Drag `My second matter` in last stage - change to another stage', () => {
      cy.get('[data-test=matter-card]').eq(1).drag('.stage-draggable-2')

      checkStagesCounter([1, 1, 1])
    })
  })

  describe('Reset the entire state', () => {
    it('Only edit first matter then reset', () => {
      editFirstMatterTitle()
      cy.get('[data-test=reset-kanban]').click()

      cy.get('[data-test=matter-card]')
        .first()
        .then(($matter) => {
          cy.wrap($matter)
            .find('[data-test=matter-title]')
            .should('contain', 'My first matter')

          cy.wrap($matter)
            .find('[data-test=matter-reference]')
            .should('contain', '#1')
        })
    })

    it('Add matter on each stage then reset', () => {
      for (let i = 0; i < 3; i++) {
        createMatterInStage(i)
      }

      // Click on reset button
      cy.get('[data-test=reset-kanban]').click()

      cy.get('[data-test=stage-title]').should('have.length', 3)
      cy.get('[data-test=matter-title]').should('have.length', 3)

      checkDisplayOptions()
    })

    it('Change display options to hide colors then reset to show colors again', () => {
      displayOptions('colors')

      cy.get('[data-test=reset-kanban]').click()

      checkDisplayOptions()
    })
  })
})
