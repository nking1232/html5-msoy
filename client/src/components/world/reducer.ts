import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as PIXI from 'pixi.js-legacy';
import { ParticipantMap, Room, World, WorldError } from './types';

export const initialState: World = {
  error: null,
  pixi: {
    app: new PIXI.Application(),
    stage: new PIXI.Container(),
  },
  room: {
    id: 0,
    participantMap: {},
  },
  socket: null,
};

const slice = createSlice({
  name: 'world',
  initialState,
  reducers: {
    resizePixiApp: (state) => {
      const { app } = state.pixi;
      const parent = app.view.parentElement;
      if (parent) {
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
      }
    },
    setParticipantMap: (state, action: PayloadAction<ParticipantMap>) => {
      state.room.participantMap = action.payload;
    },
    setRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload;
    },
    setWorldError: (state, action: PayloadAction<WorldError>) => {
      state.error = action.payload;
    },
    setWorldSocket: (state, action: PayloadAction<WebSocket | null>) => {
      state.socket = action.payload;
    },
  },
});

export const { actions } = slice;
export const { reducer } = slice;
