import 'jsxm/xm';
import 'jsxm/xmeffects';

export class SoundEngine {

    public static getInstance(): SoundEngine {
        if (SoundEngine.instance === null) {
            SoundEngine.instance = new SoundEngine();
        }

        return SoundEngine.instance;
    }

    private static instance: SoundEngine = null;
    private audioContext: AudioContext;

    private audioMap: Map<string, AudioBuffer>;

    private constructor() {
        XMPlayer.init();
        this.audioContext = XMPlayer.audioctx;
        this.audioMap = new Map<string, AudioBuffer>();
    }

    public loadSound(key: string, filename: string): Promise<Map<string, AudioBuffer>> {
        return fetch(filename)
            .then((response: Response) => response.arrayBuffer())
            .then((arrayBuffer: ArrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
            .then((audioBuffer: AudioBuffer) => this.audioMap.set(key, audioBuffer));
    }

    public play(key: string) {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioMap.get(key);
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0.12;
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        source.start();
    }

    public playExtendedModule(filename: string) {
        return fetch(filename)
            .then((response: Response) => response.arrayBuffer())
            .then((arrayBuffer: ArrayBuffer) => {
                if (arrayBuffer) {
                    XMPlayer.load(arrayBuffer);
                    XMPlayer.play();
                } else {
                    console.log('unable to load', filename);
                }
            });
    }

}
