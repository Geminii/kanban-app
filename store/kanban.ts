import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import defaultStages from '~/data/default-stages'

export const state = () => ({
  stages: defaultStages.stages,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  countTotalCards: (state) =>
    state.stages.map((s) => s.cards.length).reduce((r, n) => r + n),
  getLastOrderMatter: (state) => (parentStageIndex: number) =>
    state.stages[parentStageIndex].cards.map((c) => c.order).length,
}

export const mutations: MutationTree<RootState> = {
  CREATE_TASK: (state, { parentStageIndex, matter }) => {
    state.stages[parentStageIndex].cards.push(matter)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  createTask({ commit, getters }, { parentStageIndex, matter }) {
    // await back-end response to create task
    console.info('BACK-END response to create task')
    commit('CREATE_TASK', {
      parentStageIndex,
      matter: {
        id: uuidv4(),
        title: matter.title,
        reference: getters.countTotalCards + 1,
        order: getters.getLastOrderMatter(parentStageIndex),
        color: matter.color,
      },
    })
  },
}
