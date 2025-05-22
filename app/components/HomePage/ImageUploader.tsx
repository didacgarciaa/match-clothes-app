import Image from 'next/image';
import { colors } from '@/lib/config/colors';

interface ImageUploaderProps {
  uploadedImage: string | null;
  isProcessing: boolean;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export default function ImageUploader({
  uploadedImage,
  isProcessing,
  onImageUpload,
  onReset
}: ImageUploaderProps) {
  return (
    <div 
      className={`rounded-3xl shadow-lg ${uploadedImage ? 'flex-1' : 'w-full'} mx-auto`} 
      style={{ 
        minHeight: uploadedImage ? '500px' : '360px',
        maxWidth: uploadedImage ? '100%' : '480px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {!uploadedImage ? (
        <div className="flex flex-col justify-center items-center h-full p-8 text-center">
          <div className="mb-8">
            <svg 
              className="mx-auto h-16 w-16 hover:translate-y-0.5 transition-transform duration-300 ease-in-out"
              style={{ color: colors.primary }} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-3" style={{ color: colors.text }}>
            Upload your clothing
          </h2>
          <p className="mb-8 text-base" style={{ color: colors.textLight }}>
            or drag and drop a file
          </p>
          <button 
            className="px-10 py-4 rounded-xl font-medium text-white cursor-pointer inline-block transition-colors duration-200 shadow-md text-base 
                       hover:translate-y-0.5 transition-transform duration-300 ease-in-out"
            style={{ backgroundColor: colors.primary }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Upload Image
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="sr-only" 
              accept="image/*" 
              onChange={onImageUpload}
            />
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="relative h-full flex-grow flex items-center justify-center overflow-hidden m-3" 
            style={{ minHeight: '450px', boxSizing: 'border-box' }}>
            {isProcessing && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-14 w-14 border-t-3 border-b-3" style={{ borderColor: colors.primary }}></div>
              </div>
            )}
            <Image 
              src={uploadedImage} 
              alt="Uploaded clothing" 
              width={600}
              height={600}
              priority
              style={{ 
                objectFit: 'contain',
                width: '100%',
                height: '100%',
                maxHeight: '450px'
              }}
              className="rounded-xl"
            />
          </div>
          
          {!isProcessing && (
            <div className="p-2 mb-4 text-center">
              <button 
                id="upload-another"
                className="px-6 py-2 rounded-xl font-medium text-white transition-colors duration-200 text-base shadow-md hover:translate-y-0.5 transition-transform duration-300 ease-in-out"
                style={{ backgroundColor: colors.primary }}
                onClick={onReset}
              >
                Upload Another
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 