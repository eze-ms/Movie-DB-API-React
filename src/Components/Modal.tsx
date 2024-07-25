import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { useAppStore } from '../stores/useAppStore'
import { formatVoteAverage, formatDate } from '../utils/formatting'

export default function Modal() {

    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state) => state.closeModal)
    const selectedMovie = useAppStore((state) => state.selectedMovie)
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
    const favoriteExists = useAppStore((state) => state.favoriteExists)

   return (
       <Transition appear show={modal} as={Fragment}>
           <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                {/* Fondo desenfocado */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center filter blur-sm"
                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path})` }}
                                ></div>
                                {/* Overlay para oscurecer el fondo */}
                                <div className="absolute inset-0 bg-black opacity-50"></div>
                                {/* Contenido del modal */}
                                <div className="relative z-10 p-4">
                                    <DialogTitle as="h3" className="text-gray-100 text-4xl font-extrabold my-5 text-center">
                                        {selectedMovie.title}
                                    </DialogTitle>
                                    
                                    <img
                                        src={selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : ""}
                                        alt={`Imagen de ${selectedMovie.title}`}
                                        className="mx-auto w-96"
                                    />
                                        
                                    <div className='flex flex-col'>
                                        <div className='space-y-5'>
                                            <h3 className="text-gray-100 text-2xl font-medium my-5">
                                                Género
                                            </h3>
                                            <p className="text-base text-gray-100">
                                                {selectedMovie.genres ? selectedMovie.genres.map(genre => genre.name).join(', ') : 'N/A'}
                                            </p>
                                            <div className="w-1/2 border-b border-gray-300"></div>
                                        </div>
                                        
                                        <div className='space-y-5'>
                                            <h3 className="text-gray-100 text-2xl font-medium my-5">
                                                Sinopsis
                                            </h3>
                                            <p className='text-base text-gray-100'>{selectedMovie.overview}</p>
                                            <div className="w-1/2 border-b border-gray-300"></div>
                                        </div>

                                        <div className='space-y-5'>
                                            <h3 className="text-gray-100 text-2xl font-medium my-5">
                                                Año
                                            </h3>
                                            <p className='text-base text-gray-100'>
                                                {formatDate(selectedMovie.release_date)}
                                            </p>
                                            <div className="w-1/2 border-b border-gray-300"></div>
                                        </div>

                                        <div className='space-y-5 pb-8'>
                                            <h3 className="text-gray-100 text-2xl font-medium my-5">
                                                Puntuación
                                            </h3>
                                            <p className="text-base text-gray-100">
                                                {formatVoteAverage(selectedMovie.vote_average)} / 10
                                            </p>
                                            <div className="w-1/2 border-b border-gray-300"></div>
                                        </div>
                                    </div>
                                    
                                    <div className='mt-5 flex justify-evenly'>
                                        <button
                                            type='button'
                                            className='w-1/3 mx-2 rounded bg-gray-300 p-2 font-medium uppercase text-black shadow hover:bg-gray-400'
                                            onClick={closeModal}
                                        >
                                            Cerrar
                                        </button>

                                        <button
                                            type='button'
                                            className='w-1/3 mx-2 rounded bg-custom-hover p-2 font-medium uppercase text-white shadow hover:bg-orange-400'
                                            onClick={() => {
                                                handleClickFavorite(selectedMovie)
                                                closeModal()
                                            }}
                                        >
                                            {favoriteExists(selectedMovie.id) ? 'Eliminar Favorito' : 'Agregar a Favoritos'}
                                        </button>
                                    </div>

                                </div>
                                
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
           </Dialog>
       </Transition>
   )
}
