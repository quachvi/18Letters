import React, { useState } from 'react';
import { Mail, Send, Heart, CheckCircle, Clock, Gift, User, Calendar, LogOut, Plus, Eye } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [letters, setLetters] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [invitationToken, setInvitationToken] = useState(null);

  const SignUpView = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const handleSignUp = () => {
      if (!formData.name || !formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const existingAccount = accounts.find(acc => acc.email === formData.email);
      if (existingAccount) {
        alert('An account with this email already exists');
        return;
      }

      const newAccount = {
        id: 'user_' + Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      setAccounts(prev => [...prev, newAccount]);
      setCurrentUser(newAccount);
      setView('account-dashboard');
      alert('✅ Account created successfully!');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Gift className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Start organizing heartfelt birthday letters</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleSignUp}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
            >
              Create Account
            </button>

            <div className="text-center">
              <button
                onClick={() => setView('login')}
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                Already have an account? Log in
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setView('landing')}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoginView = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const handleLogin = () => {
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }

      const account = accounts.find(acc => acc.email === formData.email && acc.password === formData.password);
      if (!account) {
        alert('Invalid email or password');
        return;
      }

      setCurrentUser(account);
      setView('account-dashboard');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Gift className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Log in to manage your letter collections</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
            >
              Log In
            </button>

            <div className="text-center">
              <button
                onClick={() => setView('signup')}
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                Don't have an account? Sign up
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setView('landing')}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AccountDashboard = () => {
    const userProjects = projects.filter(p => p.userId === currentUser.id);

    const handleLogout = () => {
      setCurrentUser(null);
      setView('landing');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">18 Letters</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">My Letter Collections</h2>
              <p className="text-gray-600 mt-1">Manage all your birthday letter projects</p>
            </div>
            <button
              onClick={() => setView('create-project')}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              <Plus className="w-5 h-5" />
              New Collection
            </button>
          </div>

          {userProjects.length === 0 ? (
            <div className="text-center py-20">
              <Gift className="w-24 h-24 mx-auto mb-6 text-gray-300" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No collections yet</h3>
              <p className="text-gray-600 mb-6">Create your first letter collection to get started</p>
              <button
                onClick={() => setView('create-project')}
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                <Plus className="w-5 h-5" />
                Create Your First Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map(project => {
                const projectInvitations = invitations.filter(inv => inv.projectId === project.id);
                const submittedCount = projectInvitations.filter(inv => inv.letterSubmitted).length;
                const totalCount = projectInvitations.length;
                const progress = totalCount > 0 ? (submittedCount / totalCount) * 100 : 0;

                return (
                  <div key={project.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{project.recipientName}</h3>
                      <p className="text-purple-100 text-sm">Birthday: {new Date(project.birthday).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-bold text-purple-600">{submittedCount}/{totalCount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Submitted</span>
                          <span className="font-semibold text-green-600">{submittedCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Pending</span>
                          <span className="font-semibold text-orange-600">{totalCount - submittedCount}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentProject(project);
                          setView('project-details');
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const CreateProjectView = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
          <p className="text-gray-600 mb-8">This feature is coming soon! For now, go back to dashboard.</p>
          <button
            onClick={() => setView('account-dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  };

  const ProjectDetailsView = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Project Details</h1>
          <button
            onClick={() => setView('account-dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  };

  const WriteLetterView = () => {
    return <div>Write Letter View</div>;
  };

  const RecipientEmailView = () => {
    return <div>Recipient Email View</div>;
  };

  const RecipientSignUpView = () => {
    return <div>Recipient SignUp View</div>;
  };

  const RecipientLoginView = () => {
    return <div>Recipient Login View</div>;
  };

  const RecipientDashboard = () => {
    return <div>Recipient Dashboard</div>;
  };

  const LandingView = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center text-white mb-12">
          <Gift className="w-24 h-24 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">18 Letters</h1>
          <p className="text-2xl text-purple-100 mb-2">Make their 18th birthday unforgettable</p>
          <p className="text-xl text-purple-200">Collect 18 heartfelt letters from the people who matter most</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Account</h3>
                <p className="text-gray-600">Sign up to organize and track multiple letter collections over time.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Send Invitations</h3>
                <p className="text-gray-600">Add 18 email addresses of friends, family, teachers, and mentors who will write letters.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor submissions in real-time from your dashboard as letters come in.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Birthday Delivery</h3>
                <p className="text-gray-600">On their 18th birthday, they receive all letters as a beautiful digital gift.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={() => setView('signup')}
            className="bg-white text-purple-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-purple-50 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started - Create Account
          </button>
          <div>
            <button
              onClick={() => setView('login')}
              className="text-white hover:text-purple-100 text-lg underline"
            >
              Already have an account? Log in
            </button>
          </div>
          <p className="text-white mt-4 text-sm">Free digital delivery • No credit card required</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'landing' && <LandingView />}
      {view === 'signup' && <SignUpView />}
      {view === 'login' && <LoginView />}
      {view === 'account-dashboard' && <AccountDashboard />}
      {view === 'create-project' && <CreateProjectView />}
      {view === 'project-details' && <ProjectDetailsView />}
      {view === 'write-letter' && <WriteLetterView />}
      {view === 'recipient-email' && <RecipientEmailView />}
      {view === 'recipient-signup' && <RecipientSignUpView />}
      {view === 'recipient-login' && <RecipientLoginView />}
      {view === 'recipient-dashboard' && <RecipientDashboard />}
    </div>
  );
};

export default App;