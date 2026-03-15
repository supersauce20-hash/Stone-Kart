/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad, MousePointer2, Circle as CircleIcon, Globe, MapPin, Users, Trophy, User, Wifi, Car, Zap, AlertTriangle, Timer, Swords, Disc, Wind, Shuffle, Settings, Volume2, Monitor, Box, LogOut, FastForward } from 'lucide-react';

type GameState = 'CONTROLLER_CHECK' | 'DEVICE_SELECT' | 'SPLASH' | 'MAIN_MENU' | 'LOADING' | 'ONLINE_MENU' | 'MESSAGE' | 'SINGLE_MENU' | 'CC_SELECT' | 'CHARACTER_SELECT' | 'PART_SELECT' | 'CONFIRM_SELECTION' | 'MAP_SELECT' | 'DEV_MENU';
type DeviceType = 'tablet' | 'computer';

const SinglePlayerGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-emerald-500/10 blur-[30px] rounded-full" />
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, 1, 0]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative transform-gpu"
    >
      <Car size={400} className="text-emerald-400/30 drop-shadow-[0_0_20px_rgba(16,185,129,0.2)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 blur-[20px] rounded-full" />
    </motion.div>
  </div>
);

const MultiplayerGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full gap-12 transform-gpu">
    <div className="absolute inset-0 bg-blue-500/10 blur-[30px] rounded-full" />
    <motion.div
      animate={{ x: [-10, 0, -10] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="transform-gpu"
    >
      <Car size={240} className="text-blue-400/30 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
    </motion.div>
    
    <div className="relative w-48 h-48 flex items-center justify-center transform-gpu">
      <motion.div
        animate={{ 
          scale: [1, 1.8, 1],
          opacity: [0.4, 1, 0.4],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="absolute transform-gpu"
      >
        <Zap size={120} className="text-yellow-400/40 fill-yellow-400/30" />
      </motion.div>
      <div className="absolute w-32 h-32 bg-yellow-500/20 blur-[20px] rounded-full" />
    </div>

    <motion.div
      animate={{ x: [10, 0, 10] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="transform-gpu"
    >
      <Car size={240} className="text-blue-400/30 transform -scale-x-100 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
    </motion.div>
  </div>
);

const OnlinePlayGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-purple-500/10 blur-[30px] rounded-full" />
    <div className="relative w-[400px] h-[400px] flex items-center justify-center transform-gpu">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 transform-gpu"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="transform-gpu">
            <User size={80} className="text-purple-300/40" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="transform-gpu">
            <User size={80} className="text-purple-300/40" />
          </motion.div>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="transform-gpu">
            <User size={80} className="text-purple-300/40" />
          </motion.div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="transform-gpu">
            <User size={80} className="text-purple-300/40" />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="transform-gpu"
      >
        <Globe size={280} className="text-purple-400/20 drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]" />
      </motion.div>
    </div>
    <div className="absolute w-72 h-72 bg-purple-500/20 blur-[30px] rounded-full" />
  </div>
);

const WirelessPlayGraphic = () => (
  <div className="relative flex items-center justify-around w-full h-full px-24 transform-gpu">
    <div className="absolute inset-0 bg-orange-500/10 blur-[30px] rounded-full" />
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        className="transform-gpu"
      >
        <User size={160} className="text-orange-400/20 drop-shadow-[0_0_15px_rgba(249,115,22,0.2)]" />
      </motion.div>
    ))}
  </div>
);

const WorldwideGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-blue-500/10 blur-[40px] rounded-full" />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="relative transform-gpu"
    >
      <Globe size={380} className="text-blue-400/20 drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]" />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, Math.cos(i * 60 * Math.PI / 180) * 200],
            y: [0, Math.sin(i * 60 * Math.PI / 180) * 200]
          }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </motion.div>
  </div>
);

const RegionalGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-emerald-500/10 blur-[40px] rounded-full" />
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-64 h-64 border-2 border-emerald-500/30 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <MapPin size={320} className="text-emerald-400/30 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
      </motion.div>
      <div className="absolute -bottom-8 w-48 h-4 bg-emerald-500/10 blur-md rounded-[100%]" />
    </div>
  </div>
);

const FriendsGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-purple-500/10 blur-[40px] rounded-full" />
    <div className="flex flex-col items-center gap-12 relative z-0">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -15, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: i * 0.3 },
            x: { duration: 0.8, delay: i * 0.3 },
            y: { duration: 4, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="flex items-center gap-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse" />
            <User size={120} className="text-purple-400/40 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] relative z-10" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-neutral-950 z-20 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>
          </div>
          <div className="space-y-3">
            <motion.div 
              animate={{ width: [120, 160, 120] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="h-4 bg-purple-400/20 rounded-full" 
            />
            <div className="h-2 w-24 bg-purple-400/10 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
      <Users size={600} className="text-purple-300" />
    </div>
  </div>
);

const TournamentsGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-orange-500/10 blur-[40px] rounded-full" />
    <motion.div
      animate={{ 
        rotateY: [0, 360],
        y: [0, -10, 0]
      }}
      transition={{ 
        rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
      className="relative transform-gpu"
    >
      <Trophy size={360} className="text-orange-400/30 drop-shadow-[0_0_40px_rgba(249,115,22,0.4)]" />
      <motion.div
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute -top-4 -right-4"
      >
        <Zap size={64} className="text-yellow-400/50 fill-yellow-400/30" />
      </motion.div>
    </motion.div>
  </div>
);

const GrandPrixGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-emerald-500/10 blur-[40px] rounded-full" />
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative transform-gpu"
    >
      <Trophy size={380} className="text-emerald-400/30 drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]" />
      <motion.div
        animate={{ opacity: [0, 1, 0], y: [0, -40, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-12 left-1/2 -translate-x-1/2"
      >
        <Zap size={80} className="text-emerald-200/40 fill-emerald-200/20" />
      </motion.div>
    </motion.div>
  </div>
);

const TimeTrialsGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-blue-500/10 blur-[40px] rounded-full" />
    <div className="relative flex flex-col items-center gap-8">
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      >
        <Car size={320} className="text-blue-400/30" />
      </motion.div>
      <div className="flex gap-4">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ width: [20, 60, 20], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            className="h-2 bg-blue-400/40 rounded-full"
          />
        ))}
      </div>
      <Timer size={120} className="text-blue-300/20 absolute -top-12 -right-12 animate-pulse" />
    </div>
  </div>
);

const VersusRaceGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-blue-500/5" />
    
    {/* Dynamic Speed Lines */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: i % 2 === 0 ? -1000 : 2000, y: (Math.random() * 100) + '%' }}
          animate={{ x: i % 2 === 0 ? 2000 : -1000 }}
          transition={{ 
            duration: 0.5 + Math.random() * 1, 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "linear"
          }}
          className={`absolute h-px w-64 ${i % 2 === 0 ? 'bg-red-500/20' : 'bg-blue-500/20'}`}
        />
      ))}
    </div>

    <div className="relative flex items-center justify-center gap-4">
      <motion.div
        animate={{ 
          x: [-400, -50, -60, -50],
          rotateY: [0, 0],
          scale: [0.8, 1.1, 1.1, 1.1]
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="relative z-20"
      >
        <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
        <Car size={280} className="text-red-500/40 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]" />
      </motion.div>

      <motion.div
        animate={{ 
          scale: [0, 1.5, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="w-32 h-32 bg-white rounded-full blur-3xl z-30"
      />

      <motion.div
        animate={{ 
          x: [400, 50, 60, 50],
          rotateY: [180, 180],
          scale: [0.8, 1.1, 1.1, 1.1]
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="relative z-20"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
        <Car size={280} className="text-blue-500/40 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
      </motion.div>
    </div>

    <div className="absolute inset-0 pointer-events-none border-[20px] border-white/5 opacity-20" />
  </div>
);

const BattleGraphic = () => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className="absolute inset-0 bg-purple-500/10 blur-[40px] rounded-full" />
    <div className="relative">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <Swords size={340} className="text-purple-400/30" />
      </motion.div>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          animate={{ 
            x: [0, Math.cos(i * 45 * Math.PI / 180) * 150],
            y: [0, Math.sin(i * 45 * Math.PI / 180) * 150],
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
        >
          <Zap size={32} className="text-purple-300/40 fill-purple-300/20" />
        </motion.div>
      ))}
    </div>
  </div>
);

const DriverVisual = ({ color, type }: { color: string, type: 'light' | 'medium' | 'heavy' }) => (
  <div className="relative w-[400px] h-[500px] flex items-center justify-center">
    {/* Body/Suit */}
    <motion.div 
      className="relative z-10"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Torso */}
      <div className={`w-48 h-64 ${color} rounded-t-[60px] rounded-b-[20px] relative overflow-hidden shadow-2xl border-x-4 border-white/10`}>
        {/* Suit Details */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-black/20" />
        
        {/* Accent Stripes based on type */}
        {type === 'light' && (
          <div className="absolute top-20 left-0 w-full flex flex-col gap-4 opacity-40">
            <div className="h-1 bg-white" />
            <div className="h-1 bg-white w-2/3" />
          </div>
        )}
        {type === 'medium' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-32 h-32 border-8 border-white rounded-full" />
          </div>
        )}
        {type === 'heavy' && (
          <div className="absolute bottom-0 left-0 w-full h-32 bg-black/40 skew-y-12" />
        )}

        {/* Shoulders */}
        <div className={`absolute -left-4 top-4 w-12 h-24 ${color} rounded-full rotate-12 brightness-75`} />
        <div className={`absolute -right-4 top-4 w-12 h-24 ${color} rounded-full -rotate-12 brightness-75`} />
      </div>

      {/* Helmet */}
      <motion.div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-40 h-44 z-20"
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Helmet Shell */}
        <div className={`w-full h-full ${color} rounded-[50px] relative shadow-2xl border-t-4 border-white/20`}>
          {/* Visor */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[85%] h-20 bg-neutral-900 rounded-xl overflow-hidden border border-white/10">
            {/* Visor Reflection */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 blur-2xl" />
          </div>

          {/* Helmet Details based on type */}
          {type === 'light' && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Zap size={40} className="text-white/40" />
            </div>
          )}
          {type === 'medium' && (
            <div className="absolute top-4 left-4 right-4 h-2 bg-white/20 rounded-full" />
          )}
          {type === 'heavy' && (
            <>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-neutral-800 rounded-r-lg" />
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-neutral-800 rounded-l-lg" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-8 bg-neutral-800 rounded-t-full" />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>

    {/* Shadow */}
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/40 blur-2xl rounded-full" />
  </div>
);

const CharacterGraphic = ({ color, type }: { color: string, type: 'light' | 'medium' | 'heavy' }) => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className={`absolute inset-0 ${color.replace('bg-', 'bg-')}/10 blur-[80px] rounded-full`} />
    <motion.div
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <div className={`absolute inset-0 ${color.replace('bg-', 'bg-')}/20 blur-3xl rounded-full scale-150`} />
      
      <DriverVisual color={color} type={type} />
      
      {/* Aura Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            scale: [1, 1.3],
            opacity: [0.2, 0]
          }}
          transition={{ 
            duration: 3, 
            delay: i * 1, 
            repeat: Infinity, 
            ease: "easeOut" 
          }}
          className={`absolute inset-0 border-2 ${color.replace('bg-', 'border-')}/20 rounded-full`}
        />
      ))}
    </motion.div>
  </div>
);

const CHARACTERS = [
  { 
    id: 'green', 
    name: 'Dash', 
    label: 'The Sprinter',
    description: 'Lightweight agile suit for maximum acceleration.',
    color: 'emerald',
    accent: 'bg-emerald-500',
    border: 'border-emerald-500/30',
    type: 'light' as const,
    icon: Zap,
    stats: { acceleration: 3, speed: 1 }
  },
  { 
    id: 'yellow', 
    name: 'Balance', 
    label: 'The Professional',
    description: 'Standard grade racing gear for all-round performance.',
    color: 'yellow',
    accent: 'bg-yellow-500',
    border: 'border-yellow-500/30',
    type: 'medium' as const,
    icon: CircleIcon,
    stats: { acceleration: 2, speed: 2 }
  },
  { 
    id: 'red', 
    name: 'Velocity', 
    label: 'The Rocket',
    description: 'Heavy aerodynamic plating for extreme top speeds.',
    color: 'red',
    accent: 'bg-red-500',
    border: 'border-red-500/30',
    type: 'heavy' as const,
    icon: Car,
    stats: { acceleration: 1, speed: 3 }
  }
];

const GLIDERS = [
  { id: 'super', name: 'Super Glider', stats: { acceleration: 1, speed: 0 }, icon: Wind, color: 'emerald', accent: 'bg-emerald-500', border: 'border-emerald-500/30' },
  { id: 'cloud', name: 'Cloud Glider', stats: { acceleration: 0, speed: 1 }, icon: Wind, color: 'blue', accent: 'bg-blue-500', border: 'border-blue-500/30' },
  { id: 'random', name: 'Random', stats: { acceleration: 0, speed: 0 }, icon: Shuffle, color: 'orange', accent: 'bg-orange-500', border: 'border-orange-500/30' },
];

const StoneGraphic = () => {
  const { enable3D, gameSpeed } = React.useContext(DevContext);
  return (
    <div className={`relative w-32 h-32 flex items-center justify-center ${enable3D ? '[perspective:1000px]' : ''}`}>
      <motion.div
        style={enable3D ? { transformStyle: 'preserve-3d' } : {}}
        animate={{
          rotateY: enable3D ? [0, 360] : [0, 0, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 4 / gameSpeed, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-24 h-24"
      >
        {/* Main Rock Body */}
        <div className="absolute inset-0 bg-neutral-600 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] shadow-2xl border-b-8 border-neutral-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-400/40 via-transparent to-black/40" />
          {/* Rugged details */}
          <div className="absolute top-2 left-4 w-8 h-4 bg-neutral-500/50 rounded-full blur-sm" />
          <div className="absolute bottom-4 right-6 w-10 h-6 bg-neutral-700/50 rounded-full blur-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-4 border-white/5 rounded-full" />
        </div>
        
        {/* 3D Depth for Stone */}
        {enable3D && (
          <div className="absolute inset-0 bg-neutral-800 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] translate-z-[-15px] blur-[2px]" />
        )}
      </motion.div>
    </div>
  );
};

const StickGraphic = () => {
  const { enable3D, gameSpeed } = React.useContext(DevContext);
  return (
    <div className={`relative w-32 h-32 flex items-center justify-center ${enable3D ? '[perspective:1000px]' : ''}`}>
      <motion.div
        style={enable3D ? { transformStyle: 'preserve-3d' } : {}}
        animate={{
          rotateZ: [-5, 5, -5],
          rotateY: enable3D ? [0, 360] : [0, 0, 0],
          y: [0, -5, 0]
        }}
        transition={{ duration: 3 / gameSpeed, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-8 h-32 flex flex-col items-center"
      >
        {/* Main Branch */}
        <div className="w-4 h-full bg-amber-900 rounded-full relative shadow-xl border-r-2 border-black/20">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-800/50 via-transparent to-black/30" />
          
          {/* Knots and details */}
          <div className="absolute top-1/4 left-1 w-2 h-2 bg-amber-950 rounded-full" />
          <div className="absolute top-2/3 right-1 w-1.5 h-1.5 bg-amber-950 rounded-full" />
          
          {/* Small Branch Offshoot */}
          <div className="absolute top-1/3 -right-4 w-6 h-2 bg-amber-900 rotate-[-30deg] rounded-full border-r border-black/20">
             <div className="absolute -right-1 -top-1 w-3 h-3 bg-emerald-600 rounded-[80%_20%_80%_20%] rotate-45 shadow-sm" />
          </div>
        </div>

        {/* 3D Depth for Stick */}
        {enable3D && (
          <div className="absolute inset-0 bg-amber-950 w-4 h-full rounded-full translate-z-[-8px] blur-[1px]" />
        )}
      </motion.div>
    </div>
  );
};

const CUPS = [
  { id: 'stone', label: 'Stone Cup', renderGraphic: () => <StoneGraphic />, color: 'from-neutral-500/20 to-neutral-500/5', border: 'border-neutral-500/30', accent: 'bg-neutral-500' },
  { id: 'stick', label: 'Stick Cup', renderGraphic: () => <StickGraphic />, color: 'from-amber-700/20 to-amber-700/5', border: 'border-amber-700/30', accent: 'bg-amber-700' },
];

const MUSIC_URLS = {
  SPLASH: 'https://assets.mixkit.co/music/preview/mixkit-disco-club-161.mp3',
  MAIN_MENU: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
  SINGLE: 'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3',
  MULTI: 'https://assets.mixkit.co/music/preview/mixkit-funky-beats-242.mp3',
  ONLINE: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3',
  WIRELESS: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-738.mp3',
};

const WHEELS = [
  { id: 'roller', name: 'Roller', stats: { acceleration: 1, speed: 0 }, icon: Disc, color: 'emerald', accent: 'bg-emerald-500', border: 'border-emerald-500/30' },
  { id: 'slim', name: 'Slim', stats: { acceleration: 0, speed: 1 }, icon: Disc, color: 'blue', accent: 'bg-blue-500', border: 'border-blue-500/30' },
  { id: 'random', name: 'Random', stats: { acceleration: 0, speed: 0 }, icon: Shuffle, color: 'orange', accent: 'bg-orange-500', border: 'border-orange-500/30' },
];

const KARTS = [
  { id: 'standard', name: 'Standard Kart', stats: { acceleration: 1, speed: 0 }, icon: Car, color: 'emerald', accent: 'bg-emerald-500', border: 'border-emerald-500/30' },
  { id: 'sport', name: 'Sport Bike', stats: { acceleration: 0, speed: 1 }, icon: Car, color: 'blue', accent: 'bg-blue-500', border: 'border-blue-500/30' },
  { id: 'random', name: 'Random', stats: { acceleration: 0, speed: 0 }, icon: Shuffle, color: 'orange', accent: 'bg-orange-500', border: 'border-orange-500/30' },
];

const ChassisGraphic = ({ colorClass, design }: { colorClass: string, design: string }) => {
  const { enable3D, gameSpeed } = React.useContext(DevContext);
  return (
    <div className={`relative w-64 h-32 ${enable3D ? '[perspective:1000px]' : ''}`}>
      <motion.div 
        className={`w-full h-full ${colorClass} rounded-t-[40px] rounded-b-lg relative overflow-hidden border-t-4 border-white/20 shadow-2xl`}
        style={enable3D ? { transformStyle: 'preserve-3d' } : {}}
        animate={{ 
          y: [0, -5, 0],
          rotateX: enable3D ? [10, 15, 10] : [0, 0, 0],
          rotateY: enable3D ? [-5, 5, -5] : [0, 0, 0]
        }}
        transition={{ duration: 4 / gameSpeed, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/40" />
        
        {/* Side Panels for 3D effect */}
        {enable3D && (
          <>
            <div className="absolute -left-2 top-0 w-4 h-full bg-black/20 -skew-y-12" />
            <div className="absolute -right-2 top-0 w-4 h-full bg-black/20 skew-y-12" />
          </>
        )}

        {/* Design Overlay */}
        {design === 'standard' && <div className="absolute inset-0 flex items-center justify-center opacity-20"><div className="w-full h-4 bg-white rotate-12" /></div>}
        {design === 'sport' && <div className="absolute inset-0 flex items-center justify-center opacity-20"><div className="w-12 h-12 border-4 border-white rounded-full" /></div>}
        {design === 'random' && <div className="absolute inset-0 flex items-center justify-center opacity-20"><Shuffle size={48} /></div>}
        
        {/* Cockpit */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-12 bg-neutral-900/90 rounded-t-full border border-white/20 shadow-inner" />
        
        {/* Engine/Back Detail */}
        <div className="absolute bottom-0 right-4 w-12 h-8 bg-neutral-800 rounded-t-md border-t border-white/10" />
      </motion.div>
    </div>
  );
};

const WheelGraphic = ({ colorClass, design, size = 32 }: { colorClass: string, design: string, size?: number }) => {
  const { enable3D, gameSpeed } = React.useContext(DevContext);
  return (
    <div className={enable3D ? "[perspective:500px]" : ""}>
      <motion.div 
        className={`relative rounded-full border-4 border-neutral-800 bg-neutral-900 shadow-xl flex items-center justify-center overflow-hidden`}
        style={{ 
          width: size * 4, 
          height: size * 4,
          transformStyle: enable3D ? 'preserve-3d' : 'flat'
        }}
        animate={{ 
          rotate: 360,
          rotateY: enable3D ? [0, 15, 0] : [0, 0, 0]
        }}
        transition={{ 
          rotate: { duration: 1 / gameSpeed, repeat: Infinity, ease: "linear" },
          rotateY: { duration: 2 / gameSpeed, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Tire Tread */}
        <div className="absolute inset-0 border-[6px] border-neutral-700 rounded-full opacity-50" />
        
        <div className={`w-[75%] h-[75%] rounded-full ${colorClass} flex items-center justify-center border-2 border-white/20 shadow-inner`}>
          {design === 'roller' && <div className="w-4 h-4 bg-white/60 rounded-full shadow-[0_0_10px_white]" />}
          {design === 'slim' && <div className="w-1.5 h-full bg-white/40" />}
          {design === 'random' && <Shuffle size={size} className="text-white/40" />}
        </div>
        
        {/* Spokes */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-full h-1.5 bg-white/50" />
          <div className="w-full h-1.5 bg-white/50 rotate-90" />
        </div>
        
        {/* Hub Cap */}
        <div className="absolute w-4 h-4 bg-neutral-800 rounded-full border border-white/20" />
      </motion.div>
    </div>
  );
};

const KiteGraphic = ({ colorClass, design }: { colorClass: string, design: string }) => {
  const { enable3D, gameSpeed } = React.useContext(DevContext);
  return (
    <div className={`relative w-64 h-64 flex items-center justify-center ${enable3D ? '[perspective:1000px]' : ''}`}>
      <motion.div 
        className="relative"
        style={enable3D ? { transformStyle: 'preserve-3d' } : {}}
        animate={{ 
          rotate: [-5, 5, -5],
          rotateX: enable3D ? [20, 30, 20] : [0, 0, 0],
          y: [-10, 10, -10]
        }}
        transition={{ duration: 4 / gameSpeed, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Kite Shape */}
        <div className={`w-48 h-48 ${colorClass} rotate-45 relative shadow-2xl border-2 border-white/30`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/30" />
          {/* Ribs */}
          <div className="absolute top-0 left-0 w-full h-full border-t border-l border-white/20" />
          
          {/* Design */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-45 opacity-40">
            {design === 'super' && <Zap size={80} className="text-white drop-shadow-[0_0_15px_white]" />}
            {design === 'cloud' && <div className="w-32 h-16 bg-white rounded-full blur-xl" />}
            {design === 'random' && <Shuffle size={80} className="text-white" />}
          </div>
        </div>
        
        {/* 3D Depth for Kite */}
        {enable3D && <div className="absolute inset-0 bg-black/20 translate-z-[-10px] blur-sm" />}

        {/* Tail */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className={`w-4 h-4 ${colorClass} rotate-45 border border-white/20`}
              animate={{ 
                x: [0, 15, -15, 0],
                rotateY: enable3D ? [0, 180, 360] : [0, 0, 0]
              }}
              transition={{ 
                x: { duration: 2 / gameSpeed, delay: i * 0.2, repeat: Infinity },
                rotateY: { duration: 3 / gameSpeed, delay: i * 0.2, repeat: Infinity }
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const FullVehicleGraphic = ({ kartIdx, wheelIdx, gliderIdx, characterIdx }: { kartIdx: number, wheelIdx: number, gliderIdx: number, characterIdx: number }) => {
  const kart = KARTS[kartIdx];
  const wheel = WHEELS[wheelIdx];
  const glider = GLIDERS[gliderIdx];
  const char = CHARACTERS[characterIdx];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Glider/Kite at the top */}
      <div className="absolute -top-32 z-0">
        <KiteGraphic colorClass={glider.accent} design={glider.id} />
      </div>

      {/* Driver/Character */}
      <div className="relative z-20 scale-50 -mb-48">
        <DriverVisual color={char.color} type={char.type} />
      </div>

      {/* Chassis */}
      <div className="relative z-10">
        <ChassisGraphic colorClass={kart.accent} design={kart.id} />
      </div>

      {/* Wheels */}
      <div className="flex gap-32 -mt-8 relative z-30">
        <WheelGraphic colorClass={wheel.accent} design={wheel.id} size={24} />
        <WheelGraphic colorClass={wheel.accent} design={wheel.id} size={24} />
      </div>
    </div>
  );
};

const CCGraphic = ({ speed, colorClass }: { speed: number, colorClass: string }) => (
  <div className="relative flex items-center justify-center w-full h-full transform-gpu">
    <div className={`absolute inset-0 ${colorClass.replace('bg-', 'bg-')}/10 blur-[60px] rounded-full`} />
    <div className="relative flex flex-col items-center gap-12">
      <motion.div
        animate={{ 
          x: [-150, 150],
          y: [0, -10, 10, 0],
          skewX: [-10, 10, -10]
        }}
        transition={{ 
          duration: 2 / speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <Car size={300} className={`${colorClass.replace('bg-', 'text-')}/40`} />
      </motion.div>
      
      <div className="flex gap-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              width: [20, 100, 20],
              opacity: [0.1, 0.3, 0.1],
              x: [0, -50 * speed, 0]
            }}
            transition={{ 
              duration: 1 / speed, 
              delay: i * 0.1, 
              repeat: Infinity 
            }}
            className={`h-3 ${colorClass} opacity-20 rounded-full`}
          />
        ))}
      </div>

      <div className="absolute -bottom-24 flex items-baseline gap-2">
        <span className={`text-8xl font-black ${colorClass.replace('bg-', 'text-')}/10 italic`}>SPEED</span>
        <span className={`text-4xl font-bold ${colorClass.replace('bg-', 'text-')}/20 italic`}>x{speed}</span>
      </div>
    </div>
  </div>
);

const CC_OPTIONS = [
  { id: '50cc', label: '50cc', speed: 1, color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', accent: 'bg-emerald-500' },
  { id: '100cc', label: '100cc', speed: 2, color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', accent: 'bg-blue-500' },
  { id: '150cc', label: '150cc', speed: 3, color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30', accent: 'bg-orange-500' },
  { id: '200cc', label: '200cc', speed: 4, color: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30', accent: 'bg-red-500' },
];

const SINGLE_OPTIONS = [
  { id: 'grandprix', label: 'Grand Prix', icon: Trophy, renderGraphic: () => <GrandPrixGraphic />, color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', accent: 'bg-emerald-500' },
  { id: 'timetrials', label: 'Time Trials', icon: Timer, renderGraphic: () => <TimeTrialsGraphic />, color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', accent: 'bg-blue-500' },
  { id: 'versus', label: 'Versus Race', icon: Car, renderGraphic: () => <VersusRaceGraphic />, color: 'from-red-500/20 to-red-500/5', border: 'border-red-500/30', accent: 'bg-red-500' },
  { id: 'battle', label: 'Battle', icon: Swords, renderGraphic: () => <BattleGraphic />, color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', accent: 'bg-purple-500' }
];

const MENU_OPTIONS = [
  { id: 'single', label: 'Single Player', icon: User, renderGraphic: () => <SinglePlayerGraphic />, color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', accent: 'bg-emerald-500' },
  { id: 'multi', label: 'Multiplayer', icon: Users, renderGraphic: () => <MultiplayerGraphic />, color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', accent: 'bg-blue-500' },
  { id: 'online', label: 'Online Play', icon: Globe, renderGraphic: () => <OnlinePlayGraphic />, color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', accent: 'bg-purple-500' },
  { id: 'wireless', label: 'Wireless Play', icon: Wifi, renderGraphic: () => <WirelessPlayGraphic />, color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30', accent: 'bg-orange-500' }
];

const ONLINE_OPTIONS = [
  { id: 'worldwide', label: 'Worldwide', icon: Globe, renderGraphic: () => <WorldwideGraphic />, color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/30', accent: 'bg-blue-500' },
  { id: 'regional', label: 'Regional', icon: MapPin, renderGraphic: () => <RegionalGraphic />, color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', accent: 'bg-emerald-500' },
  { id: 'friends', label: 'Friends', icon: Users, renderGraphic: () => <FriendsGraphic />, color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', accent: 'bg-purple-500' },
  { id: 'tournaments', label: 'Tournaments', icon: Trophy, renderGraphic: () => <TournamentsGraphic />, color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/30', accent: 'bg-orange-500' }
];

const DevContext = React.createContext({ enable3D: true, gameSpeed: 1 });

export default function App() {
  const [gameState, setGameState] = useState<GameState>('CONTROLLER_CHECK');
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [isControllerConnected, setIsControllerConnected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState({ main: '', sub: '' });
  const [nextState, setNextState] = useState<GameState>('MAIN_MENU');
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [devOptions, setDevOptions] = useState({
    gameSpeed: 1,
    musicVolume: 0.5,
    vibrationStrength: 0.8,
    showScanlines: true,
    enable3D: true,
  });
  const devSequence = useRef<number[]>([]);

  // Selection State
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [selectedKart, setSelectedKart] = useState(0);
  const [selectedWheels, setSelectedWheels] = useState(0);
  const [selectedGlider, setSelectedGlider] = useState(0);
  const [partSelectionStep, setPartSelectionStep] = useState<'KART' | 'WHEEL' | 'GLIDER'>('KART');
  const [prevIndex, setPrevIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = devOptions.musicVolume;
    }

    let url = '';
    if (gameState === 'SPLASH') {
      url = MUSIC_URLS.SPLASH;
    } else if (gameState === 'MAIN_MENU' || gameState === 'SINGLE_MENU' || gameState === 'CC_SELECT' || gameState === 'CHARACTER_SELECT' || gameState === 'PART_SELECT' || gameState === 'CONFIRM_SELECTION') {
      url = MUSIC_URLS.SINGLE;
    }

    if (url) {
      if (audioRef.current.src !== url) {
        audioRef.current.src = url;
        audioRef.current.load();
      }
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback prevented:", error);
          // Add a one-time listener to play on next interaction if blocked
          const unlock = () => {
            audioRef.current?.play();
            window.removeEventListener('click', unlock);
            window.removeEventListener('keydown', unlock);
          };
          window.addEventListener('click', unlock);
          window.addEventListener('keydown', unlock);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [gameState]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = devOptions.musicVolume;
    }
  }, [devOptions.musicVolume]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevIndex(selectedIndex);
    }, 50);
    return () => clearTimeout(timer);
  }, [selectedIndex]);
  
  // Refs for gamepad polling state
  const inputCooldown = useRef<number>(0);
  const lastPressed = useRef<Record<number, boolean>>({});
  const audioCtx = useRef<AudioContext | null>(null);

  // Handle Gamepad connection
  useEffect(() => {
    const handleConnect = () => setIsControllerConnected(true);
    const handleDisconnect = () => {
      const gamepads = navigator.getGamepads();
      setIsControllerConnected(Array.from(gamepads).some(gp => gp !== null));
    };

    window.addEventListener("gamepadconnected", handleConnect);
    window.addEventListener("gamepaddisconnected", handleDisconnect);

    if (Array.from(navigator.getGamepads()).some(gp => gp !== null)) {
      setIsControllerConnected(true);
    }

    return () => {
      window.removeEventListener("gamepadconnected", handleConnect);
      window.removeEventListener("gamepaddisconnected", handleDisconnect);
    };
  }, []);

  // Beep Sound Logic
  const beepCount = useRef<number>(0);
  useEffect(() => {
    let interval: number;
    
    if (gameState === 'LOADING') {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      interval = window.setInterval(() => {
        if (audioCtx.current) {
          const osc = audioCtx.current.createOscillator();
          const gain = audioCtx.current.createGain();
          
          osc.type = 'sine';
          
          // Pattern: 2 low (440Hz), 2 high (880Hz)
          const isHigh = Math.floor(beepCount.current / 2) % 2 === 1;
          osc.frequency.setValueAtTime(isHigh ? 880 : 440, audioCtx.current.currentTime);
          
          gain.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
          
          osc.connect(gain);
          gain.connect(audioCtx.current.destination);
          
          osc.start();
          osc.stop(audioCtx.current.currentTime + 0.1);
          
          beepCount.current++;
        }
      }, 400 / devOptions.gameSpeed); 
    } else {
      beepCount.current = 0;
    }

    return () => clearInterval(interval);
  }, [gameState]);

  const triggerVibration = (duration = 100, strong = 0.5, weak = 0.5) => {
    if (!vibrationEnabled) return;
    const gp = Array.from(navigator.getGamepads()).find(g => g !== null);
    if (gp && gp.vibrationActuator) {
      gp.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: duration / devOptions.gameSpeed,
        strongMagnitude: strong * devOptions.vibrationStrength,
        weakMagnitude: weak * devOptions.vibrationStrength,
      }).catch(() => {}); // Ignore errors if vibration is not supported or active
    }
  };

  const handleOnlineSelect = (index: number) => {
    triggerVibration(200, 0.8, 0.8);
    const option = ONLINE_OPTIONS[index];
    setLoadingMessage({ 
      main: `Joining ${option.label}`, 
      sub: 'Searching for players...' 
    });
    setNextState('ONLINE_MENU');
    setGameState('LOADING');
    
    setTimeout(() => {
      setGameState('ONLINE_MENU');
    }, 4000);
  };

  const handlePartSelect = (index: number) => {
    triggerVibration(200, 0.8, 0.8);
    const finalIndex = index === 2 ? Math.floor(Math.random() * 2) : index;
    
    if (partSelectionStep === 'KART') {
      setSelectedKart(finalIndex);
      setPartSelectionStep('WHEEL');
      setSelectedIndex(0);
    } else if (partSelectionStep === 'WHEEL') {
      setSelectedWheels(finalIndex);
      setPartSelectionStep('GLIDER');
      setSelectedIndex(0);
    } else if (partSelectionStep === 'GLIDER') {
      setSelectedGlider(finalIndex);
      setGameState('CONFIRM_SELECTION');
      setSelectedIndex(0);
    }
  };

  const handleCharacterSelect = (index: number) => {
    triggerVibration(200, 0.8, 0.8);
    setSelectedCharacter(index);
    setGameState('PART_SELECT');
    setPartSelectionStep('KART');
    setSelectedIndex(0);
  };

  const handleCCSelect = (index: number) => {
    triggerVibration(200, 0.8, 0.8);
    setGameState('CHARACTER_SELECT');
    setSelectedIndex(0);
  };

  const handleSingleSelect = (index: number) => {
    triggerVibration(200, 0.8, 0.8);
    const option = SINGLE_OPTIONS[index];
    
    if (option.id === 'grandprix') {
      setGameState('CC_SELECT');
      setSelectedIndex(0);
      return;
    }

    // For other modes, just stay in single menu for now or handle accordingly
    setGameState('SINGLE_MENU');
  };

  const handleConfirmSelection = () => {
    triggerVibration(200, 0.8, 0.8);
    if (selectedIndexRef.current === 0) {
      setGameState('MAP_SELECT');
      setSelectedIndex(0);
    } else {
      setGameState('PART_SELECT');
      setPartSelectionStep('GLIDER');
      setSelectedIndex(selectedGlider);
    }
  };

  const handleSelect = (index: number) => {
    triggerVibration(200, 0.8, 0.8);
    if (gameState === 'MAIN_MENU') {
      const option = MENU_OPTIONS[index];
      
      if (option.id === 'wireless' || option.id === 'multi') {
        setGameState('MESSAGE');
        return;
      }

      if (option.id === 'online') {
        setLoadingMessage({ 
          main: 'Connecting to the internet', 
          sub: 'Please wait' 
        });
        setNextState('ONLINE_MENU');
        setGameState('LOADING');
        
        setTimeout(() => {
          setGameState('ONLINE_MENU');
          setSelectedIndex(0);
        }, 5000);
      } else if (option.id === 'single') {
        setGameState('SINGLE_MENU');
        setSelectedIndex(0);
      } else {
        setGameState('MAIN_MENU');
      }
    } else if (gameState === 'ONLINE_MENU') {
      handleOnlineSelect(index);
    } else if (gameState === 'SINGLE_MENU') {
      handleSingleSelect(index);
    } else if (gameState === 'CC_SELECT') {
      handleCCSelect(index);
    } else if (gameState === 'CHARACTER_SELECT') {
      handleCharacterSelect(index);
    } else if (gameState === 'PART_SELECT') {
      handlePartSelect(index);
    } else if (gameState === 'CONFIRM_SELECTION') {
      handleConfirmSelection();
    } else if (gameState === 'MAP_SELECT') {
      // Do nothing yet as requested
      triggerVibration(50, 0.2, 0.2);
    }
  };

  const selectedIndexRef = useRef(selectedIndex);
  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  // Poll for gamepad input
  useEffect(() => {
    let rafId: number;

    const pollGamepad = () => {
      const gp = Array.from(navigator.getGamepads()).find(g => g !== null);

      if (gp) {
        const now = Date.now();
        const isPressed = (btnIndex: number) => {
          const pressed = gp.buttons[btnIndex]?.pressed;
          if (pressed && !lastPressed.current[btnIndex] && now > inputCooldown.current) {
            lastPressed.current[btnIndex] = true;
            inputCooldown.current = now + 200 / devOptions.gameSpeed;
            return true;
          }
          if (!pressed) lastPressed.current[btnIndex] = false;
          return false;
        };

        // Mapping based on device
        const CONFIRM_BTN = deviceType === 'computer' ? 0 : 2; // X on PC, Square on Tablet
        const BACK_BTN = deviceType === 'computer' ? 1 : 0;    // Circle on PC, X on Tablet

        if (gameState === 'CONTROLLER_CHECK') {
          if (gp.buttons.some(b => b.pressed)) {
            triggerVibration(100, 0.5, 0.5);
            setGameState('DEVICE_SELECT');
          }
        } else if (gameState === 'DEVICE_SELECT') {
          // D-pad
          if (isPressed(14)) { setSelectedIndex(0); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(15)) { setSelectedIndex(1); triggerVibration(50, 0.2, 0.2); }

          // Left Joystick
          const axisH = gp.axes[0];
          if (axisH < -0.5) { if (!lastPressed.current[102]) { setSelectedIndex(0); lastPressed.current[102] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[102] = false; }
          if (axisH > 0.5) { if (!lastPressed.current[103]) { setSelectedIndex(1); lastPressed.current[103] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[103] = false; }

          if (isPressed(CONFIRM_BTN)) {
            const selectedDevice = selectedIndexRef.current === 0 ? 'tablet' : 'computer';
            setDeviceType(selectedDevice);
            setLoadingMessage({ main: 'Initializing System', sub: `Optimizing for ${selectedDevice}...` });
            setNextState('SPLASH');
            setGameState('LOADING');
            setTimeout(() => {
              setGameState('SPLASH');
              setSelectedIndex(0);
            }, 3000);
          }
        } else if (gameState === 'SPLASH') {
          // Check for dev sequence: R2, L2, R1, L1 (7, 6, 5, 4)
          const sequenceTarget = [7, 6, 5, 4];
          let sequenceMatched = false;
          sequenceTarget.forEach(btn => {
            if (isPressed(btn)) {
              devSequence.current = [...devSequence.current, btn].slice(-4);
              if (devSequence.current.length === 4 && devSequence.current.every((v, i) => v === sequenceTarget[i])) {
                sequenceMatched = true;
              }
            }
          });

          if (sequenceMatched) {
            triggerVibration(400, 1, 1);
            setGameState('DEV_MENU');
            setSelectedIndex(0);
            devSequence.current = [];
          } else if (isPressed(CONFIRM_BTN)) {
            triggerVibration(200, 0.8, 0.8);
            setGameState('MAIN_MENU');
            setSelectedIndex(0);
          }
        } else if (gameState === 'DEV_MENU') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : 5)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(prev => (prev < 5 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }

          if (isPressed(14) || isPressed(15)) {
            const dir = isPressed(14) ? -1 : 1;
            setDevOptions(prev => {
              const next = { ...prev };
              if (selectedIndexRef.current === 0) next.gameSpeed = Math.max(0.5, Math.min(2, prev.gameSpeed + dir * 0.1));
              if (selectedIndexRef.current === 1) next.musicVolume = Math.max(0, Math.min(1, prev.musicVolume + dir * 0.1));
              if (selectedIndexRef.current === 2) next.vibrationStrength = Math.max(0, Math.min(1, prev.vibrationStrength + dir * 0.1));
              if (selectedIndexRef.current === 3) next.showScanlines = !prev.showScanlines;
              if (selectedIndexRef.current === 4) next.enable3D = !prev.enable3D;
              return next;
            });
            triggerVibration(50, 0.2, 0.2);
          }

          if (isPressed(CONFIRM_BTN)) {
            if (selectedIndexRef.current === 5) {
              setGameState('SPLASH');
              setSelectedIndex(0);
            } else if (selectedIndexRef.current === 3) {
              setDevOptions(prev => ({ ...prev, showScanlines: !prev.showScanlines }));
            } else if (selectedIndexRef.current === 4) {
              setDevOptions(prev => ({ ...prev, enable3D: !prev.enable3D }));
            }
            triggerVibration(100, 0.5, 0.5);
          }

          if (isPressed(BACK_BTN)) {
            setGameState('SPLASH');
            setSelectedIndex(0);
            triggerVibration(100, 0.3, 0.3);
          }
        } else if (gameState === 'CONFIRM_SELECTION') {
          // Horizontal selection
          if (isPressed(14)) { setSelectedIndex(0); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(15)) { setSelectedIndex(1); triggerVibration(50, 0.2, 0.2); }

          if (isPressed(CONFIRM_BTN)) handleConfirmSelection();
        } else if (gameState === 'MAP_SELECT') {
          // D-pad
          if (isPressed(14)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : CUPS.length - 1)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(15)) { setSelectedIndex(prev => (prev < CUPS.length - 1 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }
          
          if (isPressed(CONFIRM_BTN)) handleSelect(selectedIndexRef.current);
          
          if (isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            setGameState('CONFIRM_SELECTION');
            setSelectedIndex(0);
          }
        } else if (gameState === 'MAIN_MENU') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : MENU_OPTIONS.length - 1)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(prev => (prev < MENU_OPTIONS.length - 1 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }
          
          // Left Joystick (Vertical only for stacked menu)
          const axisV = gp.axes[1];
          if (axisV < -0.5) { if (!lastPressed.current[100]) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : MENU_OPTIONS.length - 1)); lastPressed.current[100] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[100] = false; }
          if (axisV > 0.5) { if (!lastPressed.current[101]) { setSelectedIndex(prev => (prev < MENU_OPTIONS.length - 1 ? prev + 1 : 0)); lastPressed.current[101] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[101] = false; }

          if (isPressed(CONFIRM_BTN)) handleSelect(selectedIndexRef.current);
        } else if (gameState === 'ONLINE_MENU') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : ONLINE_OPTIONS.length - 1)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(prev => (prev < ONLINE_OPTIONS.length - 1 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }

          // Left Joystick
          const axisV = gp.axes[1];
          if (axisV < -0.5) { if (!lastPressed.current[100]) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : ONLINE_OPTIONS.length - 1)); lastPressed.current[100] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[100] = false; }
          if (axisV > 0.5) { if (!lastPressed.current[101]) { setSelectedIndex(prev => (prev < ONLINE_OPTIONS.length - 1 ? prev + 1 : 0)); lastPressed.current[101] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[101] = false; }
          
          if (isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            setGameState('MAIN_MENU');
            setSelectedIndex(2);
          }
        } else if (gameState === 'SINGLE_MENU') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : SINGLE_OPTIONS.length - 1)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(prev => (prev < SINGLE_OPTIONS.length - 1 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }

          // Left Joystick
          const axisV = gp.axes[1];
          if (axisV < -0.5) { if (!lastPressed.current[100]) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : SINGLE_OPTIONS.length - 1)); lastPressed.current[100] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[100] = false; }
          if (axisV > 0.5) { if (!lastPressed.current[101]) { setSelectedIndex(prev => (prev < SINGLE_OPTIONS.length - 1 ? prev + 1 : 0)); lastPressed.current[101] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[101] = false; }
          
          if (isPressed(CONFIRM_BTN)) handleSelect(selectedIndexRef.current);
          
          if (isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            setGameState('MAIN_MENU');
            setSelectedIndex(0);
          }
        } else if (gameState === 'CC_SELECT') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : CC_OPTIONS.length - 1)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(prev => (prev < CC_OPTIONS.length - 1 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }

          // Left Joystick
          const axisV = gp.axes[1];
          if (axisV < -0.5) { if (!lastPressed.current[100]) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : CC_OPTIONS.length - 1)); lastPressed.current[100] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[100] = false; }
          if (axisV > 0.5) { if (!lastPressed.current[101]) { setSelectedIndex(prev => (prev < CC_OPTIONS.length - 1 ? prev + 1 : 0)); lastPressed.current[101] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[101] = false; }
          
          if (isPressed(CONFIRM_BTN)) handleSelect(selectedIndexRef.current);
          
          if (isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            setGameState('SINGLE_MENU');
            setSelectedIndex(0);
          }
        } else if (gameState === 'CHARACTER_SELECT') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : CHARACTERS.length - 1)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(prev => (prev < CHARACTERS.length - 1 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }

          // Left Joystick
          const axisV = gp.axes[1];
          if (axisV < -0.5) { if (!lastPressed.current[100]) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : CHARACTERS.length - 1)); lastPressed.current[100] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[100] = false; }
          if (axisV > 0.5) { if (!lastPressed.current[101]) { setSelectedIndex(prev => (prev < CHARACTERS.length - 1 ? prev + 1 : 0)); lastPressed.current[101] = true; inputCooldown.current = now + 200 / devOptions.gameSpeed; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[101] = false; }
          
          if (isPressed(CONFIRM_BTN)) handleSelect(selectedIndexRef.current);
          
          if (isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            setGameState('CC_SELECT');
            setSelectedIndex(0);
          }
        } else if (gameState === 'PART_SELECT') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : 2)); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(prev => (prev < 2 ? prev + 1 : 0)); triggerVibration(50, 0.2, 0.2); }

          // Left Joystick
          const axisV = gp.axes[1];
          if (axisV < -0.5) { if (!lastPressed.current[100]) { setSelectedIndex(prev => (prev > 0 ? prev - 1 : 2)); lastPressed.current[100] = true; inputCooldown.current = now + 200; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[100] = false; }
          if (axisV > 0.5) { if (!lastPressed.current[101]) { setSelectedIndex(prev => (prev < 2 ? prev + 1 : 0)); lastPressed.current[101] = true; inputCooldown.current = now + 200; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[101] = false; }
          
          if (isPressed(CONFIRM_BTN)) handleSelect(selectedIndexRef.current);
          
          if (isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            if (partSelectionStep === 'KART') {
              setGameState('CHARACTER_SELECT');
              setSelectedIndex(selectedCharacter);
            } else if (partSelectionStep === 'WHEEL') {
              setPartSelectionStep('KART');
              setSelectedIndex(selectedKart);
            } else if (partSelectionStep === 'GLIDER') {
              setPartSelectionStep('WHEEL');
              setSelectedIndex(selectedWheels);
            }
          }
        } else if (gameState === 'CONFIRM_SELECTION') {
          // D-pad
          if (isPressed(12)) { setSelectedIndex(0); triggerVibration(50, 0.2, 0.2); }
          if (isPressed(13)) { setSelectedIndex(1); triggerVibration(50, 0.2, 0.2); }

          // Left Joystick
          const axisV = gp.axes[1];
          if (axisV < -0.5) { if (!lastPressed.current[100]) { setSelectedIndex(0); lastPressed.current[100] = true; inputCooldown.current = now + 200; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[100] = false; }
          if (axisV > 0.5) { if (!lastPressed.current[101]) { setSelectedIndex(1); lastPressed.current[101] = true; inputCooldown.current = now + 200; triggerVibration(50, 0.2, 0.2); } } else { lastPressed.current[101] = false; }

          if (isPressed(CONFIRM_BTN)) {
            if (selectedIndexRef.current === 0) {
              triggerVibration(200, 0.8, 0.8);
              setLoadingMessage({ main: 'Race Ready!', sub: 'Loading track...' });
              setNextState('MAIN_MENU');
              setGameState('LOADING');
              setTimeout(() => {
                setGameState('MAIN_MENU');
                setSelectedIndex(0);
              }, 3000);
            } else {
              triggerVibration(100, 0.3, 0.3);
              setGameState('PART_SELECT');
              setPartSelectionStep('GLIDER');
              setSelectedIndex(selectedGlider);
            }
          }
          if (isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            setGameState('PART_SELECT');
            setPartSelectionStep('GLIDER');
            setSelectedIndex(selectedGlider);
          }
        } else if (gameState === 'MESSAGE') {
          if (isPressed(CONFIRM_BTN) || isPressed(BACK_BTN)) {
            triggerVibration(100, 0.3, 0.3);
            setGameState('MAIN_MENU');
          }
        }
      }
      rafId = requestAnimationFrame(pollGamepad);
    };

    rafId = requestAnimationFrame(pollGamepad);
    return () => cancelAnimationFrame(rafId);
  }, [gameState, partSelectionStep, selectedCharacter, selectedKart, selectedWheels, selectedGlider, deviceType, vibrationEnabled]);

  const handleScreenClick = () => {
    if (gameState === 'CONTROLLER_CHECK') setGameState('DEVICE_SELECT');
  };

  return (
    <DevContext.Provider value={{ enable3D: devOptions.enable3D, gameSpeed: devOptions.gameSpeed }}>
      <div 
        className={`min-h-screen bg-neutral-950 text-white flex items-center justify-center overflow-hidden font-sans select-none ${(gameState === 'CONTROLLER_CHECK' || gameState === 'DEVICE_SELECT') ? 'cursor-pointer' : 'pointer-events-none'}`}
        onClick={handleScreenClick}
      >
      <AnimatePresence mode="wait">
        {gameState === 'CONTROLLER_CHECK' && (
          <motion.div
            key="check"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8 max-w-md px-6"
          >
            <div className="flex justify-center">
              <div className="relative">
                <Gamepad size={80} className="text-neutral-400 animate-pulse" />
                {isControllerConnected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </motion.div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xl font-medium text-neutral-200">This requires a PlayStation controller. Please connect one to continue.</p>
              <div className="flex items-center justify-center gap-2 text-neutral-500 animate-bounce pt-8">
                <MousePointer2 size={20} />
                <p className="text-sm uppercase tracking-widest font-semibold">Click the screen to continue</p>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'DEVICE_SELECT' && (
          <motion.div
            key="device-select"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-12 max-w-2xl w-full px-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Select Device</h2>
              <p className="text-neutral-400 uppercase tracking-widest text-xs">Choose your platform for optimal mapping</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { id: 'computer', label: 'Computer', icon: Trophy, desc: 'Standard mapping' },
                { id: 'tablet', label: 'Tablet', icon: Users, desc: 'Alternative mapping' }
              ].map((device) => (
                <motion.div
                  key={device.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const selectedDevice = device.id as DeviceType;
                  setDeviceType(selectedDevice);
                  setLoadingMessage({ main: 'Initializing System', sub: `Optimizing for ${selectedDevice}...` });
                  setNextState('SPLASH');
                  setGameState('LOADING');
                  setTimeout(() => {
                    setGameState('SPLASH');
                    setSelectedIndex(0);
                  }, 3000);
                }}
                  className="bg-white/5 border border-white/10 p-12 rounded-3xl cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all flex flex-col items-center gap-6 group"
                >
                  <div className="p-6 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    <device.icon size={64} className="text-neutral-400 group-hover:text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">{device.label}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-black">{device.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'SPLASH' && (
          <motion.div
            key="splash"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="text-center space-y-12"
          >
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-2">
              <h1 className="text-8xl font-black tracking-tighter italic uppercase text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Stone Cart</h1>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-neutral-900 z-10">
                    <span className="text-2xl font-bold text-emerald-500">
                      {deviceType === 'computer' ? 'X' : 'X'}
                    </span>
                  </div>
                </div>
                <p className="text-neutral-400 font-medium tracking-widest uppercase text-sm">
                  Press <span className="text-emerald-500 font-bold">X</span> on your controller to start
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {gameState === 'MAIN_MENU' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex items-center px-16 relative z-10">
            {/* Background Graphic */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full transform-gpu"
                >
                  {MENU_OPTIONS[selectedIndex].renderGraphic()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full max-w-md relative z-10">
              <div className="mb-16">
                <motion.h2 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg"
                >
                  Stone Cart
                </motion.h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="h-1 w-24 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-full w-1/2 bg-white"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">Main Menu</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative">
                {/* Track */}
                <div className="absolute -left-10 w-2 h-full bg-white/5 rounded-full" />
                
                {/* Jazz Indicator */}
                <motion.div
                  className="absolute -left-10 w-2 bg-white rounded-full z-30 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  animate={{
                    top: selectedIndex * 112 + 24,
                    bottom: (MENU_OPTIONS.length - 1 - selectedIndex) * 112 + 24
                  }}
                  transition={{
                    top: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex > prevIndex ? 0.1 : 0 },
                    bottom: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex < prevIndex ? 0.1 : 0 }
                  }}
                />
                
                {MENU_OPTIONS.map((option, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.div
                      key={option.id}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleSelect(i);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      animate={{ 
                        x: isSelected ? 20 : 0,
                        scale: isSelected ? 1.02 : 1,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'
                      }}
                      className={`relative h-24 overflow-hidden rounded-2xl border transition-all cursor-pointer ${isSelected ? 'border-white ring-4 ring-white/10' : option.border} p-6 text-left flex items-center justify-between group z-20`}
                    >
                      <div className="relative z-10 flex items-center gap-6">
                        <div className={`p-3 rounded-xl ${isSelected ? option.accent : 'bg-white/5'} transition-colors`}>
                          <option.icon size={32} className={isSelected ? 'text-white' : 'text-neutral-500'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-2xl font-bold tracking-tight ${isSelected ? 'text-white' : 'text-neutral-400'}`}>{option.label}</span>
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 mt-1"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/60">Ready to Start</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'CONFIRM_SELECTION' && (
          <motion.div
            key="confirm-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-neutral-950 overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col scale-90 md:scale-75 lg:scale-90">
              <div className="flex-1 grid grid-cols-2 w-full max-w-[1200px] mx-auto items-center px-8">
                {/* Left Side: Buttons */}
                <div className="flex flex-col gap-6 items-center justify-center">
                  <motion.div
                    onClick={() => handleConfirmSelection()}
                    animate={{
                      scale: selectedIndex === 0 ? 1.05 : 1,
                      x: selectedIndex === 0 ? 10 : 0,
                      opacity: selectedIndex === 0 ? 1 : 0.4
                    }}
                    className={`w-80 py-8 rounded-3xl bg-white text-black font-black italic text-3xl uppercase tracking-tighter shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all cursor-pointer ${selectedIndex === 0 ? 'ring-4 ring-white/50' : ''}`}
                  >
                    Confirm
                  </motion.div>
                  
                  <motion.div
                    onClick={() => {
                      setGameState('PART_SELECT');
                      setPartSelectionStep('GLIDER');
                      setSelectedIndex(selectedGlider);
                    }}
                    animate={{
                      scale: selectedIndex === 1 ? 1.05 : 1,
                      x: selectedIndex === 1 ? 10 : 0,
                      opacity: selectedIndex === 1 ? 1 : 0.4
                    }}
                    className={`w-80 py-8 rounded-3xl bg-white/5 text-white font-black italic text-3xl uppercase tracking-tighter border border-white/20 flex items-center justify-center transition-all cursor-pointer ${selectedIndex === 1 ? 'ring-4 ring-white/50' : ''}`}
                  >
                    Back
                  </motion.div>
                </div>

                {/* Right Side: Car */}
                <div className="flex justify-center items-center scale-75">
                  <FullVehicleGraphic 
                    kartIdx={selectedKart} 
                    wheelIdx={selectedWheels} 
                    gliderIdx={selectedGlider} 
                    characterIdx={selectedCharacter} 
                  />
                </div>
              </div>

              {/* Bottom Middle: Text */}
              <div className="pb-8 text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-1">
                    Assembled!
                  </h1>
                  <p className="text-neutral-500 uppercase tracking-[0.8em] font-bold text-xs md:text-sm">
                    Ready to Race
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'MAP_SELECT' && (
          <motion.div
            key="map-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col bg-neutral-950 p-12"
          >
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-1 bg-white" />
                <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">Grand Prix</p>
              </div>
              <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic">Select Cup</h1>
            </div>

            <div className="flex-1 flex items-center justify-center gap-12">
              {CUPS.map((cup, i) => {
                const isSelected = selectedIndex === i;
                return (
                  <motion.div
                    key={cup.id}
                    onClick={() => setSelectedIndex(i)}
                    animate={{
                      scale: isSelected ? 1.1 : 1,
                      opacity: isSelected ? 1 : 0.5,
                      y: isSelected ? -20 : 0
                    }}
                    className={`relative w-80 aspect-[3/4] rounded-[40px] border-2 transition-all cursor-pointer overflow-hidden ${isSelected ? 'border-white shadow-[0_0_60px_rgba(255,255,255,0.2)]' : 'border-white/10 bg-white/5'}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${cup.color} opacity-50`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <motion.div
                        animate={isSelected ? { rotateY: [0, 360] } : {}}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="mb-8"
                      >
                        {cup.renderGraphic()}
                      </motion.div>
                      <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">{cup.label}</h3>
                      <div className="mt-4 flex gap-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="w-8 h-1 bg-white/20 rounded-full" />
                        ))}
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-8 left-0 right-0 text-center"
                      >
                        <span className="text-[10px] text-white font-black uppercase tracking-[0.4em] animate-pulse">Select Cup</span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto flex justify-between items-center text-neutral-600">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold"
                onClick={() => {
                  setGameState('CONFIRM_SELECTION');
                  setSelectedIndex(0);
                }}
              >
                <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <span>Back</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.5em] font-black opacity-20">Stone Cart v1.0</p>
            </div>
          </motion.div>
        )}

        {gameState === 'PART_SELECT' && (
          <motion.div
            key="part-select"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex"
          >
            {/* Left Side: Part Graphic */}
            <div className="w-1/2 h-full relative overflow-hidden bg-neutral-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${partSelectionStep}-${selectedIndex}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {partSelectionStep === 'KART' && (
                      <ChassisGraphic 
                        colorClass={KARTS[selectedIndex].accent} 
                        design={KARTS[selectedIndex].id} 
                      />
                    )}
                    {partSelectionStep === 'WHEEL' && (
                      <WheelGraphic 
                        colorClass={WHEELS[selectedIndex].accent} 
                        design={WHEELS[selectedIndex].id} 
                      />
                    )}
                    {partSelectionStep === 'GLIDER' && (
                      <KiteGraphic 
                        colorClass={GLIDERS[selectedIndex].accent} 
                        design={GLIDERS[selectedIndex].id} 
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute top-12 left-12 z-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-3 h-12 ${(partSelectionStep === 'KART' ? KARTS : partSelectionStep === 'WHEEL' ? WHEELS : GLIDERS)[selectedIndex].accent}`} />
                  <div>
                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">
                      {(partSelectionStep === 'KART' ? KARTS : partSelectionStep === 'WHEEL' ? WHEELS : GLIDERS)[selectedIndex].name}
                    </h2>
                    <p className="text-xs text-neutral-500 uppercase tracking-[0.4em] font-bold mt-1">
                      {partSelectionStep} SELECTION
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Cumulative Stats Overlay */}
              <div className="absolute bottom-12 left-12 right-12 z-20 bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5">
                <div className="flex gap-12">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Total Acceleration</span>
                      <span className="text-xl font-black text-white italic">
                        {CHARACTERS[selectedCharacter].stats.acceleration + 
                         (partSelectionStep === 'KART' ? KARTS[selectedIndex].stats.acceleration : KARTS[selectedKart].stats.acceleration) +
                         (partSelectionStep === 'WHEEL' ? WHEELS[selectedIndex].stats.acceleration : (partSelectionStep === 'GLIDER' ? WHEELS[selectedWheels].stats.acceleration : 0)) +
                         (partSelectionStep === 'GLIDER' ? GLIDERS[selectedIndex].stats.acceleration : 0)}/6
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[...Array(6)].map((_, i) => {
                        const total = CHARACTERS[selectedCharacter].stats.acceleration + 
                                     (partSelectionStep === 'KART' ? KARTS[selectedIndex].stats.acceleration : KARTS[selectedKart].stats.acceleration) +
                                     (partSelectionStep === 'WHEEL' ? WHEELS[selectedIndex].stats.acceleration : (partSelectionStep === 'GLIDER' ? WHEELS[selectedWheels].stats.acceleration : 0)) +
                                     (partSelectionStep === 'GLIDER' ? GLIDERS[selectedIndex].stats.acceleration : 0);
                        return (
                          <div 
                            key={i}
                            className={`h-2 flex-1 rounded-full transition-all duration-500 ${i < total ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/5'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Total Top Speed</span>
                      <span className="text-xl font-black text-white italic">
                        {CHARACTERS[selectedCharacter].stats.speed + 
                         (partSelectionStep === 'KART' ? KARTS[selectedIndex].stats.speed : KARTS[selectedKart].stats.speed) +
                         (partSelectionStep === 'WHEEL' ? WHEELS[selectedIndex].stats.speed : (partSelectionStep === 'GLIDER' ? WHEELS[selectedWheels].stats.speed : 0)) +
                         (partSelectionStep === 'GLIDER' ? GLIDERS[selectedIndex].stats.speed : 0)}/6
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[...Array(6)].map((_, i) => {
                        const total = CHARACTERS[selectedCharacter].stats.speed + 
                                     (partSelectionStep === 'KART' ? KARTS[selectedIndex].stats.speed : KARTS[selectedKart].stats.speed) +
                                     (partSelectionStep === 'WHEEL' ? WHEELS[selectedIndex].stats.speed : (partSelectionStep === 'GLIDER' ? WHEELS[selectedWheels].stats.speed : 0)) +
                                     (partSelectionStep === 'GLIDER' ? GLIDERS[selectedIndex].stats.speed : 0);
                        return (
                          <div 
                            key={i}
                            className={`h-2 flex-1 rounded-full transition-all duration-500 ${i < total ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/5'}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Part Options */}
            <div className="w-1/2 h-full bg-neutral-950 border-l border-white/5 p-16 flex flex-col justify-center relative">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-1 bg-white" />
                  <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">Customization</p>
                </div>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">
                  {partSelectionStep === 'KART' ? 'Select Kart' : partSelectionStep === 'WHEEL' ? 'Select Wheels' : 'Select Glider'}
                </h1>
              </div>

              <div className="flex flex-col gap-6 relative">
                {/* Track */}
                <div className="absolute -left-10 w-2 h-full bg-white/5 rounded-full" />
                
                {/* Jazz Indicator */}
                <motion.div
                  className="absolute -left-10 w-2 bg-white rounded-full z-30 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  animate={{
                    top: selectedIndex * 152 + 24,
                    bottom: ((partSelectionStep === 'KART' ? KARTS : partSelectionStep === 'WHEEL' ? WHEELS : GLIDERS).length - 1 - selectedIndex) * 152 + 24
                  }}
                  transition={{
                    top: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex > prevIndex ? 0.1 : 0 },
                    bottom: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex < prevIndex ? 0.1 : 0 }
                  }}
                />
                
                {(partSelectionStep === 'KART' ? KARTS : partSelectionStep === 'WHEEL' ? WHEELS : GLIDERS).map((part, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.div
                      key={part.id}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleSelect(i);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      animate={{ 
                        x: isSelected ? 20 : 0,
                        scale: isSelected ? 1.02 : 1,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)'
                      }}
                      className={`relative h-32 overflow-hidden rounded-3xl border transition-all cursor-pointer ${isSelected ? 'border-white ring-4 ring-white/10' : part.border} p-8 flex items-center justify-between group z-20`}
                    >
                      <div className="flex items-center gap-8">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isSelected ? part.accent : 'bg-white/5'}`}>
                          <part.icon size={32} className={isSelected ? 'text-white' : 'text-neutral-600'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-3xl font-black italic tracking-tighter uppercase ${isSelected ? 'text-white' : 'text-neutral-500'}`}>
                            {part.name}
                          </span>
                          <div className="flex gap-2 mt-1">
                            {part.stats.acceleration > 0 && <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-bold">+ACCEL</span>}
                            {part.stats.speed > 0 && <span className="text-[8px] bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full font-bold">+SPEED</span>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white"
                    animate={{ width: partSelectionStep === 'KART' ? '33%' : partSelectionStep === 'WHEEL' ? '66%' : '100%' }}
                  />
                </div>
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                  Step {partSelectionStep === 'KART' ? '1' : partSelectionStep === 'WHEEL' ? '2' : '3'} of 3
                </span>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-neutral-600">
                <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold">
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      if (partSelectionStep === 'KART') {
                        setGameState('CHARACTER_SELECT');
                        setSelectedIndex(selectedCharacter);
                      } else if (partSelectionStep === 'WHEEL') {
                        setPartSelectionStep('KART');
                        setSelectedIndex(selectedKart);
                      } else if (partSelectionStep === 'GLIDER') {
                        setPartSelectionStep('WHEEL');
                        setSelectedIndex(selectedWheels);
                      }
                    }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span>Back ({deviceType === 'computer' ? 'Circle' : 'Circle'})</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'CHARACTER_SELECT' && (
          <motion.div
            key="character-select"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 flex"
          >
            {/* Left Side: Character Graphic */}
            <div className="w-1/2 h-full relative overflow-hidden bg-neutral-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotateY: 45 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <CharacterGraphic 
                    color={`bg-${CHARACTERS[selectedIndex].color}-500`} 
                    type={CHARACTERS[selectedIndex].type} 
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute top-12 left-12 z-20">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-3 h-12 ${CHARACTERS[selectedIndex].accent}`} />
                  <div>
                    <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">
                      {CHARACTERS[selectedIndex].name}
                    </h2>
                    <p className="text-xs text-neutral-500 uppercase tracking-[0.4em] font-bold mt-1">
                      {CHARACTERS[selectedIndex].label}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side: Character List & Stats */}
            <div className="w-1/2 h-full bg-neutral-950 border-l border-white/5 p-16 flex flex-col justify-center relative">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-1 bg-white" />
                  <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">Driver Roster</p>
                </div>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Select Driver</h1>
              </div>

              <div className="flex flex-col gap-6 relative">
                {/* Track */}
                <div className="absolute -left-10 w-2 h-full bg-white/5 rounded-full" />
                
                {/* Jazz Indicator */}
                <motion.div
                  className="absolute -left-10 w-2 bg-white rounded-full z-30 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  animate={{
                    top: selectedIndex * 152 + 24,
                    bottom: (CHARACTERS.length - 1 - selectedIndex) * 152 + 24
                  }}
                  transition={{
                    top: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex > prevIndex ? 0.1 : 0 },
                    bottom: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex < prevIndex ? 0.1 : 0 }
                  }}
                />
                
                {CHARACTERS.map((char, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.div
                      key={char.id}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleSelect(i);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      animate={{ 
                        x: isSelected ? 20 : 0,
                        scale: isSelected ? 1.02 : 1,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)'
                      }}
                      className={`relative h-32 overflow-hidden rounded-3xl border transition-all cursor-pointer ${isSelected ? 'border-white ring-4 ring-white/10' : char.border} p-8 flex items-center justify-between group z-20`}
                    >
                      <div className="flex items-center gap-8">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isSelected ? char.accent : 'bg-white/5'}`}>
                          <char.icon size={32} className={isSelected ? 'text-white' : 'text-neutral-600'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-3xl font-black italic tracking-tighter uppercase ${isSelected ? 'text-white' : 'text-neutral-500'}`}>
                            {char.name}
                          </span>
                          <span className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest">{char.label}</span>
                        </div>
                      </div>

                      {/* Stats Display */}
                      <div className="flex flex-col gap-3 w-48">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Acceleration</span>
                            <span className={`text-[8px] font-black ${isSelected ? 'text-white' : 'text-neutral-600'}`}>{char.stats.acceleration}/3</span>
                          </div>
                          <div className="flex gap-1.5">
                            {[...Array(3)].map((_, sIdx) => (
                              <div 
                                key={sIdx}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${sIdx < char.stats.acceleration ? (isSelected ? char.accent : 'bg-neutral-700') : 'bg-white/5'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Top Speed</span>
                            <span className={`text-[8px] font-black ${isSelected ? 'text-white' : 'text-neutral-600'}`}>{char.stats.speed}/3</span>
                          </div>
                          <div className="flex gap-1.5">
                            {[...Array(3)].map((_, sIdx) => (
                              <div 
                                key={sIdx}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${sIdx < char.stats.speed ? (isSelected ? char.accent : 'bg-neutral-700') : 'bg-white/5'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-neutral-600">
                <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold">
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      setGameState('CC_SELECT');
                      setSelectedIndex(0);
                    }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span>Back ({deviceType === 'computer' ? 'Circle' : 'Circle'})</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'CC_SELECT' && (
          <motion.div
            key="cc-select"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex"
          >
            {/* Left Side: Speed Visualization */}
            <div className="w-1/2 h-full relative overflow-hidden bg-neutral-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <CCGraphic 
                    speed={CC_OPTIONS[selectedIndex].speed} 
                    colorClass={CC_OPTIONS[selectedIndex].accent}
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950/50 z-10" />
            </div>

            {/* Right Side: CC Options */}
            <div className="w-1/2 h-full bg-neutral-950 border-l border-white/5 p-16 flex flex-col justify-center relative">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-1 bg-emerald-500" />
                  <p className="text-[10px] text-emerald-500 uppercase tracking-[0.3em] font-bold">Engine Class</p>
                </div>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Select CC</h1>
              </div>

              <div className="flex flex-col gap-4 relative">
                {/* Track */}
                <div className="absolute -left-10 w-2 h-full bg-white/5 rounded-full" />
                
                {/* Jazz Indicator */}
                <motion.div
                  className="absolute -left-10 w-2 bg-white rounded-full z-30 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  animate={{
                    top: selectedIndex * 112 + 24,
                    bottom: (CC_OPTIONS.length - 1 - selectedIndex) * 112 + 24
                  }}
                  transition={{
                    top: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex > prevIndex ? 0.1 : 0 },
                    bottom: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex < prevIndex ? 0.1 : 0 }
                  }}
                />
                
                {CC_OPTIONS.map((option, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.div
                      key={option.id}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleSelect(i);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      animate={{ 
                        x: isSelected ? 20 : 0,
                        scale: isSelected ? 1.02 : 1,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'
                      }}
                      className={`relative h-24 overflow-hidden rounded-2xl border transition-all cursor-pointer ${isSelected ? 'border-white ring-4 ring-white/10' : option.border} p-6 text-left flex items-center justify-between group z-20`}
                    >
                      <div className="relative z-10 flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black ${isSelected ? option.accent + ' text-white' : 'bg-white/5 text-neutral-500'} transition-colors italic`}>
                          {option.label.replace('cc', '')}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-3xl font-black italic tracking-tighter ${isSelected ? 'text-white' : 'text-neutral-400'}`}>{option.label}</span>
                          <div className="flex gap-1 mt-1">
                            {[...Array(4)].map((_, starIdx) => (
                              <div 
                                key={starIdx} 
                                className={`w-2 h-2 rounded-full ${starIdx < option.speed ? (isSelected ? 'bg-white' : 'bg-neutral-500') : 'bg-white/5'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-neutral-600">
                <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold">
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      setGameState('SINGLE_MENU');
                      setSelectedIndex(0);
                    }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span>Back ({deviceType === 'computer' ? 'Circle' : 'Circle'})</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'SINGLE_MENU' && (
          <motion.div
            key="single-menu"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 flex"
          >
            {/* Left Side: Dynamic Graphic */}
            <div className="w-1/2 h-full relative overflow-hidden bg-neutral-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  {SINGLE_OPTIONS[selectedIndex].renderGraphic()}
                </motion.div>
              </AnimatePresence>
              
              {/* Scanline Effect */}
              {devOptions.showScanlines && <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50" />}
            </div>

            {/* Right Side: Menu Options */}
            <div className="w-1/2 h-full bg-neutral-950 border-l border-white/5 p-16 flex flex-col justify-center relative">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-1 bg-white" />
                  <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">Single Player</p>
                </div>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">Select Mode</h1>
              </div>

              <div className="flex flex-col gap-4 relative">
                {/* Track */}
                <div className="absolute -left-10 w-2 h-full bg-white/5 rounded-full" />
                
                {/* Jazz Indicator */}
                <motion.div
                  className="absolute -left-10 w-2 bg-white rounded-full z-30 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  animate={{
                    top: selectedIndex * 112 + 24,
                    bottom: (SINGLE_OPTIONS.length - 1 - selectedIndex) * 112 + 24
                  }}
                  transition={{
                    top: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex > prevIndex ? 0.1 : 0 },
                    bottom: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex < prevIndex ? 0.1 : 0 }
                  }}
                />
                
                {SINGLE_OPTIONS.map((option, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.div
                      key={option.id}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleSelect(i);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      animate={{ 
                        x: isSelected ? 20 : 0,
                        scale: isSelected ? 1.02 : 1,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'
                      }}
                      className={`relative h-24 overflow-hidden rounded-2xl border transition-all cursor-pointer ${isSelected ? 'border-white ring-4 ring-white/10' : option.border} p-6 text-left flex items-center justify-between group z-20`}
                    >
                      <div className="relative z-10 flex items-center gap-6">
                        <div className={`p-3 rounded-xl ${isSelected ? option.accent : 'bg-white/5'} transition-colors`}>
                          <option.icon size={32} className={isSelected ? 'text-white' : 'text-neutral-500'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-2xl font-bold tracking-tight ${isSelected ? 'text-white' : 'text-neutral-400'}`}>{option.label}</span>
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 mt-1"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/60">Start Race</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-neutral-600">
                <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold">
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      setGameState('MAIN_MENU');
                      setSelectedIndex(0);
                    }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span>Back ({deviceType === 'computer' ? 'Circle' : 'Circle'})</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'ONLINE_MENU' && (
          <motion.div key="online-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex items-center px-16 relative z-10">
            {/* Background Graphic */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full transform-gpu"
                >
                  {ONLINE_OPTIONS[selectedIndex].renderGraphic()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full max-w-md relative z-10">
              <div className="mb-16">
                <motion.h2 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg"
                >
                  Online Play
                </motion.h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="h-1 w-24 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-full w-1/2 bg-white"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-bold">Network Mode</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative">
                {/* Track */}
                <div className="absolute -left-10 w-2 h-full bg-white/5 rounded-full" />
                
                {/* Jazz Indicator */}
                <motion.div
                  className="absolute -left-10 w-2 bg-white rounded-full z-30 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  animate={{
                    top: selectedIndex * 112 + 24,
                    bottom: (ONLINE_OPTIONS.length - 1 - selectedIndex) * 112 + 24
                  }}
                  transition={{
                    top: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex > prevIndex ? 0.1 : 0 },
                    bottom: { type: "spring", stiffness: 300, damping: 30, delay: selectedIndex < prevIndex ? 0.1 : 0 }
                  }}
                />
                
                {ONLINE_OPTIONS.map((option, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.div
                      key={option.id}
                      onClick={() => {
                        setSelectedIndex(i);
                        handleSelect(i);
                      }}
                      onMouseEnter={() => setSelectedIndex(i)}
                      animate={{ 
                        x: isSelected ? 20 : 0,
                        scale: isSelected ? 1.02 : 1,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'
                      }}
                      className={`relative h-24 overflow-hidden rounded-2xl border transition-all cursor-pointer ${isSelected ? 'border-white ring-4 ring-white/10' : option.border} p-6 text-left flex items-center justify-between group z-20`}
                    >
                      <div className="relative z-10 flex items-center gap-6">
                        <div className={`p-3 rounded-xl ${isSelected ? option.accent : 'bg-white/5'} transition-colors`}>
                          <option.icon size={32} className={isSelected ? 'text-white' : 'text-neutral-500'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-2xl font-bold tracking-tight ${isSelected ? 'text-white' : 'text-neutral-400'}`}>{option.label}</span>
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 mt-1"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/60">Connect Now</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-neutral-600">
                <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold">
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      setGameState('MAIN_MENU');
                      setSelectedIndex(2);
                    }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <span>Back ({deviceType === 'computer' ? 'Circle' : 'Circle'})</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'DEV_MENU' && (
          <motion.div
            key="dev-menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-12 bg-black/90 backdrop-blur-md"
          >
            <div className="w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl flex flex-col">
              <div className="p-12 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Settings className="text-amber-500" size={24} />
                    <span className="text-[10px] text-amber-500 uppercase tracking-[0.4em] font-black">Developer Console</span>
                  </div>
                  <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">Engine Tweaks</h1>
                </div>
                <div className="text-right">
                  <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold">Debug Build v1.0.4</p>
                  <p className="text-neutral-600 text-[9px] mt-1">Authorized Access Only</p>
                </div>
              </div>

              <div className="flex-1 p-12 grid grid-cols-2 gap-8 overflow-y-auto">
                {[
                  { id: 'speed', label: 'Game Speed', value: `${(devOptions.gameSpeed * 100).toFixed(0)}%`, icon: FastForward, color: 'text-blue-500' },
                  { id: 'volume', label: 'Music Volume', value: `${(devOptions.musicVolume * 100).toFixed(0)}%`, icon: Volume2, color: 'text-purple-500' },
                  { id: 'vibration', label: 'Vibration', value: `${(devOptions.vibrationStrength * 100).toFixed(0)}%`, icon: Zap, color: 'text-amber-500' },
                  { id: 'scanlines', label: 'Scanlines', value: devOptions.showScanlines ? 'ON' : 'OFF', icon: Monitor, color: 'text-emerald-500' },
                  { id: '3d', label: '3D Effects', value: devOptions.enable3D ? 'ON' : 'OFF', icon: Box, color: 'text-orange-500' },
                  { id: 'exit', label: 'Exit Console', value: 'Return to Splash', icon: LogOut, color: 'text-red-500' },
                ].map((opt, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.div
                      key={opt.id}
                      animate={{ 
                        scale: isSelected ? 1.05 : 1,
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                        borderColor: isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.05)'
                      }}
                      className={`p-8 rounded-3xl border transition-all flex items-center justify-between group cursor-pointer ${isSelected ? 'ring-2 ring-white/20' : ''}`}
                      onClick={() => {
                        setSelectedIndex(i);
                        if (i === 5) {
                          setGameState('SPLASH');
                          setSelectedIndex(0);
                        } else if (i === 3) {
                          setDevOptions(prev => ({ ...prev, showScanlines: !prev.showScanlines }));
                        } else if (i === 4) {
                          setDevOptions(prev => ({ ...prev, enable3D: !prev.enable3D }));
                        }
                      }}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-2xl bg-black/40 ${opt.color}`}>
                          <opt.icon size={32} />
                        </div>
                        <div className="text-left">
                          <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold mb-1">{opt.label}</p>
                          <p className="text-2xl font-black text-white italic tracking-tighter uppercase">{opt.value}</p>
                        </div>
                      </div>
                      {isSelected && i < 3 && (
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">←</div>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">→</div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-8 bg-black/40 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-neutral-500">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[8px]">↑↓</div>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[8px]">←→</div>
                    <span>Adjust</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[8px]">X</div>
                    <span>Select</span>
                  </div>
                </div>
                <p className="text-[9px] text-neutral-700 font-mono">SYSTEM_OVERRIDE_ACTIVE</p>
              </div>
            </div>
          </motion.div>
        )}
        {gameState === 'MESSAGE' && (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setGameState('MAIN_MENU')} />
            <div className="relative bg-neutral-900 border border-neutral-800 p-12 rounded-3xl max-w-lg w-full text-center space-y-8 shadow-2xl">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle size={40} className="text-amber-500" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Mode Unavailable</h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  Unfortunately, this mode is not available right now and is under development.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameState('MAIN_MENU')}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Understood
              </motion.button>
            </div>
          </motion.div>
        )}

        {gameState === 'LOADING' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center space-y-12 z-[100]"
          >
            <div className="w-64 h-1 bg-neutral-800 relative overflow-hidden rounded-full">
              <motion.div animate={{ x: [-20, 260] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-4 h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <h2 className="text-2xl font-medium text-neutral-300 tracking-tight">{loadingMessage.main}</h2>
                <p className="text-xs text-neutral-500 uppercase tracking-[0.2em] mt-1">{loadingMessage.sub}</p>
              </div>
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-neutral-800 border-t-blue-500 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-12 h-12 border-2 border-transparent border-b-blue-400/30 rounded-full scale-125" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </DevContext.Provider>
  );
}
