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
  CREATE_MATTER: (state, { stageIndex, matter }) => {
    state.stages[stageIndex].cards.push(matter)
  },
  UPDATE_MATTER: (state, { stageIndex, matters }) => {
    state.stages[stageIndex].cards = matters
  },
}

export const actions: ActionTree<RootState, RootState> = {
  createMatter({ commit, getters }, { stageIndex, matter }) {
    // await back-end response to create matter
    console.info('BACK-END response to create matter')
    commit('CREATE_MATTER', {
      stageIndex,
      matter: {
        id: uuidv4(),
        title: matter.title,
        reference: getters.countTotalCards + 1,
        order: getters.getLastOrderMatter(stageIndex),
        color: matter.color,
      },
    })
  },
}
