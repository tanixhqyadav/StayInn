import React,{useState} from 'react';
import axios from 'axios';

function PhotoUploader({addedPhotos,onChange}) {
    const [photoLink, setPhotoLink]=useState('');
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename}=await axios.post('/upload-by-link',{link:photoLink})
        onChange(prev =>{
          return [...prev,filename]
        });
        setPhotoLink('');
      }
        function uploadPhoto(ev){
        const files=ev.target.files;
        console.log({files});
        const data=new FormData();
        for(let i=0;i<files.length;i++){
          data.append('photos',files[i]);
        }
        axios.post('/upload',data,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response =>{
          const {data:filenames}=response;
          console.log(filenames)
          onChange(prev =>{
            return [...prev,...filenames]
          });
        })
      }
      function removePhoto(ev,link){
        ev.preventDefault();
        onChange(prev =>{
          return prev.filter(photo => photo !== link)
        })
      }
      function selectMain(ev,link){
        ev.preventDefault();
        const addedPhotosWithoutSelect=addedPhotos.filter(
          photo => photo !== link);
        onChange([link,...addedPhotosWithoutSelect]);
      }
  return (
    <>
    <div className='flex gap-2'>
          <input type="text" value={photoLink}
            onChange={ev => setPhotoLink(ev.target.value)}
            placeholder='Add photo by link ....jpg'/>
          <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl '>Add</button>
        </div>
        <div className=" mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {addedPhotos.map(link => (
            <div className='h-24 flex relative overflow-hidden' key={link}>
            <img src={`http://localhost:8000/uploads/${link}`} alt="uploaded" className="w-full h-24 object-cover rounded-2xl" />
          
            <button 
              onClick={ev => removePhoto( ev ,link)} 
              className='cursor-pointer absolute bottom-2 right-2 text-white z-30 bg-black bg-opacity-50 p-1 rounded-2xl'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </button>           
            <button 
              onClick={ev => selectMain(ev,link)} 
              className='cursor-pointer absolute bottom-2 left-2 text-white z-30 bg-black bg-opacity-50 p-1 rounded-2xl'
            >
              {link === addedPhotos[0] ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              )}
            </button>
          </div>          
        ))}
            <label className='h-32 flex cursor-pointer items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600' >
              <input type='file' className='hidden' onChange={uploadPhoto}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
            </label>
        </div>
    </>
  )
}

export default PhotoUploader