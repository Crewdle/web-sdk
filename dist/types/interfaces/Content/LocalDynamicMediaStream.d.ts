import { IDynamicMediaStream } from './DynamicMediaStream';
import { ILocalMediaStream } from './LocalMediaStream';
import { MediaTrackKind } from './Types';
/**
 * The local dynamic media stream interface.
 */
export interface ILocalDynamicMediaStream extends ILocalMediaStream, IDynamicMediaStream {
    /**
     * Add a track to the stream. This will replace any existing track of the same kind.
     * @param track The track to add.
     */
    addTrack(track: MediaStreamTrack): void;
    /**
     * Remove a track from the stream.
     * @param param The track or kind of track to remove.
     * @returns The removed track or null if the track was not found.
     */
    removeTrack(param: MediaStreamTrack | MediaTrackKind): MediaStreamTrack | null;
    /**
     * Replace the track with same kind as the new track in the stream.
     * @param track The track to replace.
     */
    replaceTrack(track: MediaStreamTrack): void;
}
