import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import initialStages from '~/data/default-stages'
import ConfigHandler from '~/data/default-config-handler'
import { DisplayOptions } from '~/types/display-options'
import { HttpStatusCode } from '~/types/http-status-code'

export const initialState = () => {
  return {
    stages: Object.assign({}, initialStages().stages),
    displayOptions: {
      displayColors: true,
      displayReferences: true,
    } as DisplayOptions,
  }
}

export const state = () => initialState()

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  countTotalCards: (state) => {
    return Object.values(state.stages)
      .map((s) => s.cards.length)
      .reduce((r, n) => r + n)
  },
  getLastOrderMatter: (state) => (parentStageIndex: number) =>
    state.stages[parentStageIndex].cards.map((c) => c.order).length,
  displayOptions: (state) => state.displayOptions,
}

export const mutations: MutationTree<RootState> = {
  RESET_KANBAN: (state) => {
    state.stages = Object.assign({}, initialStages().stages)
  },
  CREATE_MATTER: (state, { stageIndex, matter }) => {
    state.stages[stageIndex].cards.push(matter)
  },
  UPDATE_MATTER: (state, { stageIndex, matterIndex, matter }) => {
    state.stages[stageIndex].cards[matterIndex] = matter
  },
  DELETE_MATTER: (state, { stageIndex, matterIndex }) => {
    state.stages[stageIndex].cards.splice(matterIndex, 1)
  },
  UPDATE_STAGE_MATTERS: (state, { stageIndex, matters }) => {
    state.stages[stageIndex].cards = matters
  },
  DISPLAY_OPTION: (state, { option, isVisible }) => {
    state.displayOptions[option] = isVisible
  },
}

export const actions: ActionTree<RootState, RootState> = {
  resetKanban({ commit }, data) {
    commit('RESET_KANBAN', data)
  },
  createMatter({ commit, getters }, { stageIndex, matter }) {
    return new Promise((resolve, reject) => {
      // await back-end response to create matter
      console.info('[PUT] BACK-END response to create matter')

      // Simulate a back-end response error
      if (matter.title === ConfigHandler.MATTER_TITLE_ERROR) {
        reject(HttpStatusCode.INTERNAL_SERVER_ERROR)
      } else {
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
        resolve()
      }
    })
  },
  updateMatter({ commit }, { stageIndex, matterIndex, matter }) {
    return new Promise((resolve, reject) => {
      // await back-end response to create matter
      console.info('[POST] BACK-END response to edit matter')

      // Simulate a back-end response error
      if (matter.title === ConfigHandler.MATTER_TITLE_ERROR) {
        reject(HttpStatusCode.INTERNAL_SERVER_ERROR)
      } else {
        commit('UPDATE_MATTER', { stageIndex, matterIndex, matter })
        resolve()
      }
    })
  },
  deleteMatter({ commit }, { stageIndex, matterIndex }) {
    return new Promise((resolve) => {
      // await back-end response to delete matter
      console.info('[DELETE] BACK-END response to delete matter')

      commit('DELETE_MATTER', { stageIndex, matterIndex })
      resolve()
    })
  },
}
