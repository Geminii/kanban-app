import { GetterTree, ActionTree, MutationTree } from 'vuex'
import defaultStages from '~/data/default-stages'

export const state = () => ({
  stages: defaultStages.stages,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}
