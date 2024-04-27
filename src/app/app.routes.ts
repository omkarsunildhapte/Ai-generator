import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CommonLayoutComponent } from './components/common-layout/common-layout.component';
import { LibraryComponent } from './components/library/library.component';
import { HistoryComponent } from './components/history/history.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ChatBoxComponent } from './components/chats/chat-box/chat-box.component';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    {
        path: '', component: CommonLayoutComponent,
        children: [
            { path: 'library', component: LibraryComponent },
            { path: 'history', component: HistoryComponent },
            { path: 'blogs', component: BlogsComponent },
            { path: 'chats', component: ChatsComponent },
            { path: 'chatbox', component: ChatBoxComponent },
            { path: 'imagegenerate', component: ImageGeneratorComponent }
        ]
    }


];
