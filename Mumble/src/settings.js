import {createCameraVideoTrack, createClient, createMicrophoneAudioTrack} from 'agora-rtc-react';

export const appId = "2a42a637eff34fdc9cec9417ba21c6b4";
// export const token = "007eJxTYNhe9Shtd5BfkYXMNSmuJROeuahrpq6coH+9kW3jQi09lUoFBqNEE6NEM2Pz1LQ0Y5O0lGTL5NRkSxND86REI8NksyQToRmrUhoCGRmOOX9hYWSAQBCfhSE3MTOPgQEA26oeTA==";

export const config = { mode: "rtc", codec: "vp9" };

export const useClient = createClient(config);
export const useMicrophoneAudioTrack = createMicrophoneAudioTrack();
export const useCameraVideoTrack = createCameraVideoTrack();
// export const channelname = "main";