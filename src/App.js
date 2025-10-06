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
      alert('Account created successfully!');
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
                Back to home
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
                Back to home
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
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    birthdayMonth: '',
    birthdayDay: '',
    birthdayYear: '',
    contributorEmails: Array(18).fill(''),
    contributorNames: Array(18).fill(''),
    personalMessage: ''
  });

  const handleCreateProject = () => {
    if (!formData.recipientName || !formData.recipientEmail || 
        !formData.birthdayMonth || !formData.birthdayDay || !formData.birthdayYear) {
      alert('Please fill in all required fields');
      return;
    }
    
    const birthday = `${formData.birthdayYear}-${formData.birthdayMonth.padStart(2, '0')}-${formData.birthdayDay.padStart(2, '0')}`;
    
    const project = {
      id: 'proj_' + Date.now(),
      userId: currentUser.id,
      organizerName: currentUser.name,
      organizerEmail: currentUser.email,
      recipientName: formData.recipientName,
      recipientEmail: formData.recipientEmail,
      birthday: birthday,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    setProjects(prev => [...prev, project]);

    const newInvitations = [];
    formData.contributorEmails.forEach((email, index) => {
      if (email) {
        const invitation = {
          id: 'inv_' + Date.now() + '_' + index,
          projectId: project.id,
          contributorEmail: email,
          contributorName: formData.contributorNames[index] || 'Friend',
          token: 'token_' + Math.random().toString(36).substr(2, 9),
          status: 'sent',
          letterSubmitted: false
        };
        newInvitations.push(invitation);
      }
    });

    setInvitations(prev => [...prev, ...newInvitations]);
    setCurrentProject(project);
    alert(`Project created! ${newInvitations.length} invitations sent.`);
    setView('account-dashboard');
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...formData.contributorEmails];
    newEmails[index] = value;
    setFormData({ ...formData, contributorEmails: newEmails });
  };

  const handleNameChange = (index, value) => {
    const newNames = [...formData.contributorNames];
    newNames[index] = value;
    setFormData({ ...formData, contributorNames: newNames });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setView('account-dashboard')}
            className="text-purple-600 hover:text-purple-800"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <Gift className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Letter Collection</h1>
          <p className="text-gray-600">Gather 18 heartfelt birthday letters</p>
        </div>

        <div className="space-y-6 bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Birthday Person</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                placeholder="Sarah Johnson"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={formData.recipientEmail}
                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                placeholder="sarah@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">18th Birthday Date</label>
              <div className="grid grid-cols-3 gap-3">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.birthdayMonth}
                  onChange={(e) => setFormData({ ...formData, birthdayMonth: e.target.value })}
                >
                  <option value="">Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.birthdayDay}
                  onChange={(e) => setFormData({ ...formData, birthdayDay: e.target.value })}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.birthdayYear}
                  onChange={(e) => setFormData({ ...formData, birthdayYear: e.target.value })}
                  placeholder="YYYY"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">18 Contributors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-2">
              {Array.from({ length: 18 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-2 p-3 bg-gray-50 rounded-lg">
                  <label className="text-xs font-medium text-gray-600">Person {index + 1}</label>
                  <input
                    type="text"
                    className="px-3 py-2 text-sm border border-gray-300 rounded"
                    placeholder="Name (optional)"
                    value={formData.contributorNames[index]}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />
                  <input
                    type="email"
                    className="px-3 py-2 text-sm border border-gray-300 rounded"
                    placeholder="email@example.com"
                    value={formData.contributorEmails[index]}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreateProject}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailsView = () => {
  const project = currentProject;
  const projectInvitations = invitations.filter(inv => inv.projectId === project.id);
  const submittedCount = projectInvitations.filter(inv => inv.letterSubmitted).length;
  const pendingCount = projectInvitations.filter(inv => !inv.letterSubmitted).length;

  const simulateLetterSubmission = (invId) => {
    setInvitations(prev => 
      prev.map(inv => 
        inv.id === invId ? { ...inv, letterSubmitted: true } : inv
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => setView('account-dashboard')}
            className="text-purple-600 hover:text-purple-800"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">Letter Collection for {project.recipientName}</h1>
          <p className="text-purple-100">Birthday: {new Date(project.birthday).toLocaleDateString()}</p>
          <p className="text-purple-100 text-sm mt-1">Recipient Email: {project.recipientEmail}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Letters Submitted</p>
                <p className="text-3xl font-bold text-green-600">{submittedCount}/{projectInvitations.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Delivery Date</p>
                <p className="text-lg font-bold text-purple-600">{new Date(project.birthday).toLocaleDateString()}</p>
              </div>
              <Calendar className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Contributor Status</h2>
          </div>
          <div className="divide-y">
            {projectInvitations.map((inv, index) => (
              <div key={inv.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{inv.contributorName || 'Contributor ' + (index + 1)}</p>
                    <p className="text-sm text-gray-500">{inv.contributorEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {inv.letterSubmitted ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Submitted
                    </span>
                  ) : (
                    <>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Pending
                      </span>
                      <button
                        onClick={() => simulateLetterSubmission(inv.id)}
                        className="text-sm text-purple-600 hover:text-purple-800 underline"
                      >
                        Simulate Submit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
		        <div className="mt-6 flex gap-4">
          <button
            onClick={() => {
              const firstPending = projectInvitations.find(inv => !inv.letterSubmitted);
              if (firstPending) {
                setInvitationToken(firstPending.token);
                setView('write-letter');
              } else {
                alert('All letters have been submitted!');
              }
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Test: Write Letter (as Contributor)
          </button>
          
          <button
            onClick={() => setView('recipient-email')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Test: View Birthday Email
          </button>
        </div>
      </div>
    </div>
  );
};

const WriteLetterView = () => {
  const invitation = invitations.find(inv => inv.token === invitationToken);
  const project = projects.find(p => p.id === invitation?.projectId);
  
  const [letterContent, setLetterContent] = useState('');
  const [authorName, setAuthorName] = useState(invitation?.contributorName || '');

  const handleSubmitLetter = () => {
    if (!letterContent || letterContent.length < 100) {
      alert('Please write at least 100 characters');
      return;
    }

    if (!authorName) {
      alert('Please enter your name');
      return;
    }
    
    const letter = {
      id: 'letter_' + Date.now(),
      projectId: project.id,
      invitationId: invitation.id,
      authorName: authorName,
      content: letterContent,
      submittedAt: new Date().toISOString()
    };

    setLetters(prev => [...prev, letter]);
    setInvitations(prev =>
      prev.map(inv =>
        inv.id === invitation.id ? { ...inv, letterSubmitted: true } : inv
      )
    );

    alert('Letter submitted successfully!');
    setView('project-details');
  };

  if (!invitation || !project) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-red-600">Invalid invitation link</p>
        <button
          onClick={() => setView('project-details')}
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Project
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 mx-auto mb-4 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Write a Birthday Letter</h1>
          <p className="text-gray-600">
            {project.organizerName} has invited you to write a birthday letter for <strong>{project.recipientName}</strong>'s 18th birthday
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="How you would like to sign the letter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Letter</label>
            <p className="text-xs text-gray-500 mb-2">Share your favorite memories, advice, or birthday wishes</p>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              rows="12"
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              placeholder="Dear Sarah, Happy 18th Birthday! I wanted to take a moment to share how much you mean to me..."
            />
            <p className="text-xs text-gray-500 mt-1">{letterContent.length} characters (minimum 100)</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmitLetter}
              className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700"
            >
              Submit Letter
            </button>
            <button
              onClick={() => setView('project-details')}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipientEmailView = () => {
  const project = currentProject;
  const projectLetters = letters.filter(l => l.projectId === project.id);
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => setView('project-details')}
        className="mb-4 text-purple-600 hover:text-purple-800"
      >
        ← Back to Project
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 text-center">
          <Gift className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Happy 18th Birthday!</h1>
          <p className="text-xl">{project.recipientName}</p>
        </div>

        <div className="p-8">
          <p className="text-lg text-gray-800 mb-4">
            Someone special has organized a wonderful surprise for you!
          </p>
          
          <p className="text-gray-700 mb-6">
            <strong>{project.organizerName}</strong> has gathered heartfelt birthday letters from people who care about you.
          </p>

          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="font-semibold text-gray-800 mb-3">You have received letters from:</p>
            <div className="grid grid-cols-2 gap-2">
              {projectLetters.map((letter) => (
                <div key={letter.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {letter.authorName}
                </div>
              ))}
              {projectLetters.length < 18 && (
                <div className="col-span-2 text-sm text-gray-500 italic mt-2">
                  ...and more letters are on the way!
                </div>
              )}
              {projectLetters.length === 0 && (
                <div className="col-span-2 text-sm text-gray-500 italic">
                  No letters submitted yet. This is just a preview!
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            These letters are waiting for you. Create your account to read them and treasure this special gift!
          </p>

          <button
  onClick={() => setView('recipient-signup')}
  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition duration-200 flex items-center justify-center gap-2"
>
  <Mail className="w-6 h-6" />
  Create Account to Read Letters
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            This gift was organized with love by {project.organizerName}
          </p>
        </div>
      </div>
    </div>
  );
};

const RecipientSignUpView = () => {
  const project = currentProject;
  const [formData, setFormData] = useState({
    name: project?.recipientName || '',
    email: project?.recipientEmail || '',
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

    if (formData.email !== project.recipientEmail) {
      alert('Please use the email where you received the birthday notification');
      return;
    }

    const existingAccount = accounts.find(acc => acc.email === formData.email);
    if (existingAccount) {
      alert('An account with this email already exists. Please log in instead.');
      setView('recipient-login');
      return;
    }

    const newAccount = {
      id: 'user_' + Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'recipient',
      createdAt: new Date().toISOString()
    };

    setAccounts(prev => [...prev, newAccount]);
    setCurrentUser(newAccount);
    setView('recipient-dashboard');
    alert('Account created! Welcome to your birthday letters.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Gift className="w-16 h-16 mx-auto mb-4 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Set up your account to read your birthday letters from {project?.organizerName}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              value={formData.email}
              readOnly
              placeholder="email@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">Use the email where you received the birthday notification</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700"
          >
            Create Account & Read Letters
          </button>

          <div className="text-center">
            <button
              onClick={() => setView('recipient-login')}
              className="text-pink-600 hover:text-pink-800 text-sm"
            >
              Already have an account? Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipientLoginView = () => {
  const project = currentProject;
  const [formData, setFormData] = useState({
    email: project?.recipientEmail || '',
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
    setView('recipient-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Gift className="w-16 h-16 mx-auto mb-4 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to read your birthday letters</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700"
          >
            Log In to Read Letters
          </button>

          <div className="text-center">
            <button
              onClick={() => setView('recipient-signup')}
              className="text-pink-600 hover:text-pink-800 text-sm"
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipientDashboard = () => {
  const project = currentProject;
  const projectLetters = letters.filter(l => l.projectId === project.id);
  const [selectedLetter, setSelectedLetter] = useState(null);

  if (selectedLetter) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => setSelectedLetter(null)}
              className="text-purple-600 hover:text-purple-800"
            >
              ← Back to all letters
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="border-b pb-4 mb-6">
              <p className="text-sm text-gray-500">From</p>
              <h2 className="text-2xl font-bold text-gray-900">{selectedLetter.authorName}</h2>
              <p className="text-xs text-gray-400 mt-1">
                Submitted {new Date(selectedLetter.submittedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {selectedLetter.content}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={() => alert('Thank you message sent to ' + selectedLetter.authorName)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Send Thank You
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-pink-600" />
            <h1 className="text-2xl font-bold text-gray-900">Your Birthday Letters</h1>
          </div>
          <button
            onClick={() => {
              setCurrentUser(null);
              setView('landing');
            }}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-2">Happy 18th Birthday!</h2>
          <p className="text-purple-100">A special gift organized by {project.organizerName}</p>
        </div>

        <div className="mb-6">
          <p className="text-lg text-gray-700">
            You have <strong>{projectLetters.length} letters</strong> from people who care about you. Take your time reading each one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectLetters.map((letter, index) => (
            <div
              key={letter.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedLetter(letter)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{letter.authorName}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{letter.content}</p>
              <div className="mt-4 text-purple-600 font-semibold hover:text-purple-800 flex items-center gap-1">
                Read Letter →
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Send Thank You Messages</h3>
          <button
            onClick={() => alert('Thank you message sent to ' + project.organizerName)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
          >
            Thank {project.organizerName}
          </button>
        </div>
      </div>
    </div>
  );
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