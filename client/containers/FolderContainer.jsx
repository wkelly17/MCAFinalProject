import React from 'react';
import Container from '../components/Container';
import FolderList from '../components/FolderList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Desktop, Tablet, Mobile, Default } from '../components/MediaQueryHocs';
import {
  useQuery,
  // useMutation,
  useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from 'react-query';
import { getFolders } from '../utils/apiFunctions';

export default function FoldersContainer({ setFolders, foldersState }) {
  const { isLoading, isError, data, error } = useQuery('folders', getFolders);

  if (isLoading) {
    return <span className="p-2">Loading Folders...</span>;
  }

  if (isError) {
    return <span className="p-2">Error: {error.message}</span>;
  }

  return (
    <FolderList>
      {data.map((folder) => {
        return (
          <FolderList.Item
            setFolders={setFolders}
            key={folder._id}
            folder={folder.folderName}
            foldersState={foldersState}
            className="w-full h-full bg-$base4"
          />
        );
      })}
    </FolderList>
  );
}
