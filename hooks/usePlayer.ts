import Player from '~~/components/Player/MusicPlayer'
let playerInstance: Player
const init = ref(false)
const show = ref(false)
export const usePlayer = () => {
  if (!process.client) {
    return {
      init,
      show,
    }
  }
  if (!playerInstance) {
    const audio = document.createElement('audio')
    audio.volume = 0.4
    document.documentElement.appendChild(audio)
    playerInstance = new Player(audio)
    init.value = true
  }
  return {
    init,
    show,
    player: playerInstance!,
    current: playerInstance.current!,
    playState: playerInstance.state!,
    audio: playerInstance.audio!,
    time: playerInstance.time,
    process: playerInstance.process,
    playById: playerInstance.playById,
  }
}
