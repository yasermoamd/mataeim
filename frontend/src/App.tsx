import './App.css'  
import PublicLayout from './layouts/PublicLayout';
import { PostListComponent } from './components/PostLists';


export default function App() {  
  return (
    <PublicLayout>
      <main className='py-4 flex flex-col justify-center items-center '>
          <PostListComponent />
      </main>
    </PublicLayout>
  )
}