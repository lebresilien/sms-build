<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CreditResource\Pages;
use App\Filament\Resources\CreditResource\RelationManagers;
use App\Models\Credit;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CreditResource extends Resource
{
    protected static ?string $model = Credit::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static ?string $label = 'Recharges';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('account_id')
                    ->relationship('account.user', 'email')
                    ->disabled()
                    ->required()
                    ->columnSpanFull()
                    ->hiddenOn('create'),
                Forms\Components\TextInput::make('sms_asked')
                    ->label('Sms commandés')
                    ->disabled()
                    ->required()
                    ->numeric()
                    ->columnSpanFull()
                    ->hiddenOn('create'),
                Forms\Components\TextInput::make('sms_delivered')
                    ->label('Sms Livrés')
                    ->required()
                    ->numeric()
                    ->lte('sms_asked')
                    ->columnSpanFull()
                    ->hiddenOn('create')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('account.user.email')
                    ->label('Email'),
                Tables\Columns\TextColumn::make('sms_asked')
                    ->label('Nombre de sms commandés'),
                Tables\Columns\TextColumn::make('sms_delivered')
                    ->label('Nombre de sms Livrés')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->disabled(fn ($record) => $record->sms_delivered > 0)
                    ->tooltip('Modification désactivée si non-brouillon')
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCredits::route('/'),
            'create' => Pages\CreateCredit::route('/create'),
            'edit' => Pages\EditCredit::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
