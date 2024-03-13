import { MediaStreamPriority } from '../Content/Types';
/**
 * The peer connection connector interface - used to establish a connection between two peers.
 * @category Core
 */
export interface IPeerConnectionConnector {
    /**
     * Whether or not candidates can be added to the connection.
     */
    readonly canAddCandidates: boolean;
    /**
     * Whether or not the handshake function exists.
     */
    readonly canRestartHandshake: boolean;
    /**
     * The current connection state.
     */
    readonly connectionState: string;
    /**
     * The current gathering state.
     */
    readonly gatheringState: string;
    /**
     * The current handshake state.
     */
    readonly handshakeState: string;
    /**
     * The current signaling state.
     */
    readonly signalingState: string;
    /**
     * The callback for when a candidate is received.
     */
    onCandidate: ((event: IPeerConnectionHandshakeCandidateEvent) => void) | null;
    /**
     * The callback for when the connection state changes.
     */
    onConnectionStateChange: (() => void) | null;
    /**
     * The callback for when a data channel is received.
     */
    onDataChannel: ((event: IPeerConnectionDataChannelEvent) => void) | null;
    /**
     * The callback for when the candidate gathering state changes.
     */
    onGatheringStateChange: (() => void) | null;
    /**
     * The callback for when the handshake state changes.
     */
    onHandshakeStateChange: (() => void) | null;
    /**
     * The callback for when a track is received.
     */
    onTrack: ((event: IPeerConnectionTrackEvent) => void) | null;
    /**
     * Adds a candidate to the connection.
     * @param candidate - The candidate to add.
     * @returns A promise that resolves when the candidate has been added.
     */
    addCandidate(candidate: IPeerConnectionHandshakeCandidate): Promise<void>;
    /**
     * Adds a track to the connection.
     * @param track - The track to add.
     * @param stream - The stream to add the track to.
     * @returns The sender for the track.
     */
    addTrack(track: MediaStreamTrack, stream: MediaStream): IPeerConnectionSender;
    /**
     * Closes the connection.
     */
    close(): void;
    /**
     * Collects the stats for the receivers. The collector must be called with the stats for each stream.
     * @param receivers - The receivers to collect stats for.
     * @param collector - The callback to send the stats to.
     * @returns A promise that resolves when the stats have been collected.
     */
    collectReceiversStats(receivers: Map<string, Set<MediaStreamTrack>>, collector: (stats: PeerConnectionStatsReport[][], streamId: string) => void): Promise<void>;
    /**
     * Collects the stats for the senders. The collector must be called with the stats for each stream.
     * @param senders - The senders to collect stats for.
     * @param collector - The callback to send the stats to.
     * @returns A promise that resolves when the stats have been collected.
     */
    collectSendersStats(senders: Map<string, IPeerConnectionSenderMap>, collector: (stats: PeerConnectionStatsReport[][], streamId: string) => void): Promise<void>;
    /**
     * Creates an answer to an offer.
     * @param offer - The offer to answer.
     * @returns A promise that resolves with the answer.
     */
    createAnswer(offer: IPeerConnectionSessionDescription): Promise<IPeerConnectionSessionDescription>;
    /**
     * Creates a data channel.
     * @param label - The label for the data channel.
     * @returns The data channel connector.
     */
    createDataChannel(label: string): IPeerConnectionDataChannelConnector;
    /**
     * Creates an offer.
     * @param options - The options for creating the offer.
     * @returns A promise that resolves with the offer.
     */
    createOffer(options?: IPeerConnectionOfferOptions): Promise<IPeerConnectionSessionDescription>;
    /**
     * Handles an answer to an offer.
     * @param answer - The answer to handle.
     * @param negotiationHandler - The handler to call after the answer has been handled.
     * @returns A promise that resolves when the answer has been handled.
     */
    handleAnswer(answer: IPeerConnectionSessionDescription, negotiationHandler: () => void): Promise<void>;
    /**
     * Removes a track from the connection.
     * @param sender - The sender for the track to remove.
     */
    removeTrack(sender: IPeerConnectionSender): void;
    /**
     * Replaces a track in the connection.
     * @param track - The track to replace the current track with.
     * @param sender - The sender for the track to replace.
     */
    replaceTrack(track: MediaStreamTrack, sender: IPeerConnectionSender): Promise<void>;
    /**
     * Restarts the handshake.
     */
    restartHandshake(): void;
    /**
     * Sets the encoding parameters for the sender.
     * @param sender - The sender to set the encoding parameters for.
     * @param scaleResolutionDownBy - The scale resolution down by value.
     * @param maxFramerate - The max framerate value.
     * @param maxBitrate - The max bitrate value.
     * @param priority - The priority for the media stream.
     */
    setEncodingParameters(sender: IPeerConnectionSender, scaleResolutionDownBy: number, maxFramerate: number, maxBitrate: number, priority: MediaStreamPriority): void;
}
/**
 * The peer connection connector constructor type.
 * @category Core
 */
export type PeerConnectionConnectorConstructor = new (configuration: IPeerConnectionConfiguration) => IPeerConnectionConnector;
/**
 * The peer connection data channel connector interface.
 * @category Core
 */
export interface IPeerConnectionDataChannelConnector {
    /**
     * The current buffered amount.
     */
    readonly bufferedAmount: number;
    /**
     * The current state of the data channel.
     */
    readonly state: string;
    /**
     * The low threshold for the buffered amount.
     */
    bufferedAmountLowThreshold: number;
    /**
     * The callback for when the buffered amount is low.
     */
    onBufferedAmountLow: (() => void) | null;
    /**
     * The callback for when the data channel closes.
     */
    onClose: (() => void) | null;
    /**
     * The callback for when a message is received on the data channel.
     */
    onMessage: ((message: MessageEvent) => void) | null;
    /**
     * Closes the data channel.
     */
    close(): void;
    /**
     * @overload
     * Sends data on the data channel.
     * @param data - The data to send.
     */
    send(data: string): void;
    /**
     * @overload
     * Sends data on the data channel.
     * @param data - The data to send.
     */
    send(data: ArrayBuffer): void;
}
/**
 * The peer connection handshake candidate interface.
 * @category Core
 */
export interface IPeerConnectionHandshakeCandidate {
    /**
     * The candidate.
     */
    candidate: string;
}
/**
 * The peer connection handshake candidate event interface.
 * @category Core
 */
export interface IPeerConnectionHandshakeCandidateEvent {
    /**
     * The candidate received.
     */
    readonly candidate: IPeerConnectionHandshakeCandidate | null;
}
/**
 * The peer connection data channel event interface.
 * @category Core
 */
export interface IPeerConnectionDataChannelEvent {
    /**
     * The data channel received.
     */
    readonly channel: IPeerConnectionDataChannelConnector;
}
/**
 * The peer connection track event interface.
 * @category Core
 */
export interface IPeerConnectionTrackEvent {
    /**
     * The track received.
     */
    readonly track: MediaStreamTrack;
    /**
     * The streams associated with the track.
     */
    readonly streams: ReadonlyArray<MediaStream>;
}
/**
 * The peer connection sender interface.
 * @category Core
 */
export interface IPeerConnectionSender {
    /**
     * Replaces the current track with a new track.
     * @param track - The track to replace the current track with.
     */
    replaceTrack(track: MediaStreamTrack): Promise<void>;
}
/**
 * The peer connection sender map interface.
 * @category Core
 */
export interface IPeerConnectionSenderMap {
    /**
     * The stream associated with the sender.
     */
    stream: MediaStream;
    /**
     * The tracks associated with the sender.
     */
    tracks: {
        video?: {
            track?: MediaStreamTrack;
            sender?: IPeerConnectionSender;
        };
        audio?: {
            track?: MediaStreamTrack;
            sender?: IPeerConnectionSender;
        };
    };
}
/**
 * The peer connection offer options interface.
 * @category Core
 */
export interface IPeerConnectionOfferOptions {
    /**
     * Whether or not to restart the handshake.
     */
    handshakeRestart?: boolean;
}
/**
 * The peer connection session description interface.
 * @category Core
 */
export interface IPeerConnectionSessionDescription {
    /**
     * The SDP.
     */
    sdp?: string;
    /**
     * The type of the session description.
     */
    type: string;
}
/**
 * The peer connection configuration interface.
 * @category Core
 */
export interface IPeerConnectionConfiguration {
    /**
     * The handshake servers to use for the connection.
     */
    handshakeServers?: IPeerConnectionHandshakeServer[];
}
/**
 * The peer connection handshake server interface.
 * @category Core
 */
export interface IPeerConnectionHandshakeServer {
    /**
     * The credential for the handshake server.
     */
    credential?: string;
    /**
     * The urls for the handshake server.
     */
    urls: string | string[];
    /**
     * The username for the handshake server.
     */
    username?: string;
}
/**
 * The peer connection inbound stats report interface.
 * @category Core
 */
export interface IPeerConnectionStatsReportInbound {
    /**
     * The type of the report.
     */
    type: 'inbound-rtp';
    /**
     * The kind of the report.
     */
    kind: 'audio' | 'video';
    /**
     * The bytes received.
     */
    bytesReceived: number;
    /**
     * The timestamp.
     */
    timestamp: number;
    /**
     * The packets received.
     */
    packetsReceived: number;
    /**
     * The packets lost.
     */
    packetsLost: number;
    /**
     * The jitter.
     */
    jitter?: number;
    /**
     * The estimated playout timestamp.
     */
    estimatedPlayoutTimestamp?: number;
}
/**
 * The peer connection outbound stats report interface.
 * @category Core
 */
export interface IPeerConnectionStatsReportOutbound {
    /**
     * The type of the report.
     */
    type: 'outbound-rtp';
    /**
     * The kind of the report.
     */
    kind: 'audio' | 'video';
    /**
     * The bytes sent.
     */
    bytesSent: number;
    /**
     * The timestamp.
     */
    timestamp: number;
    /**
     * The packets sent.
     */
    packetsSent: number;
}
/**
 * The peer connection remote inbound stats report interface.
 * @category Core
 */
export interface IPeerConnectionStatsReportRemoteInbound {
    /**
     * The type of the report.
     */
    type: 'remote-inbound-rtp';
    /**
     * The kind of the report.
     */
    kind: 'audio' | 'video';
    /**
     * The round trip time.
     */
    roundTripTime: number;
    /**
     * The jitter.
     */
    jitter?: number;
}
/**
 * The peer connection unused stats report interface.
 * @category Core
 */
export interface IPeerConnectionStatsReportUnused {
    /**
     * The type of the report.
     */
    type: 'track' | 'media-source' | 'sender' | 'receiver' | 'transport' | 'candidate-pair' | 'local-candidate' | 'remote-candidate';
    /**
     * The kind of the report.
     */
    kind: 'audio' | 'video';
}
/**
 * The peer connection stats report type.
 * @category Core
 */
export type PeerConnectionStatsReport = IPeerConnectionStatsReportInbound | IPeerConnectionStatsReportOutbound | IPeerConnectionStatsReportRemoteInbound | IPeerConnectionStatsReportUnused;
