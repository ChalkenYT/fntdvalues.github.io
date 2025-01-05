import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown } from "lucide-react";

const ValueTracker = () => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Helper function to extract numeric value for sorting
  const extractNumericValue = (value) => {
    const match = value.match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  };

  const items = [
    { name: "Shadow Of Afton", value: "4k" },
    { name: "Master Puppeteer", value: "800-1k" },
    { name: "Limitless Shadow", value: "1k" },
    { name: "Agonized Springtrap", value: "4.5k" },
    { name: "Fractured Bonnie", value: "1.5k-2k" },
    { name: "RWQFSFASXC", value: "4.5k" },
    { name: "Valkyrie Prime", value: "55k" },
    { name: "Nautic Crusher Mangle", value: "30k" },
    { name: "Dark Knight Puppet", value: "700k+" },
    { name: "Exotic Butters", value: "250k-300k" },
    // Add more items here
  ];

  const sortedItems = [...items].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === 'value') {
      const valueA = extractNumericValue(a.value);
      const valueB = extractNumericValue(b.value);
      return sortConfig.direction === 'asc' 
        ? valueA - valueB
        : valueB - valueA;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader className="space-y-6 pb-4">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            FNAF Character Value Tracker
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search characters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white/50 backdrop-blur-sm border-gray-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 border-b">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('name')}
                      className="w-full flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="font-semibold">Character Name</span>
                      <ArrowUpDown className={`h-4 w-4 transition-colors ${
                        sortConfig.key === 'name' ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                    </Button>
                  </th>
                  <th className="px-4 py-3 border-b">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleSort('value')}
                      className="w-full flex items-center justify-between hover:bg-gray-100"
                    >
                      <span className="font-semibold">Value</span>
                      <ArrowUpDown className={`h-4 w-4 transition-colors ${
                        sortConfig.key === 'value' ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr 
                    key={item.name}
                    className={`
                      border-b last:border-b-0 transition-colors hover:bg-gray-50
                      ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    `}
                  >
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-right font-mono">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            {filteredItems.length} characters found
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueTracker;
